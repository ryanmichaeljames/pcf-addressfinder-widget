import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class AddressFinderWidget implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	// PowerApps component framework delegate which will be assigned to this object which would be called whenever any update happens.
	private _notifyOutputChanged: () => void;
	// input element that is used to create the range slider
	private _inputElement: HTMLInputElement;
	// Reference to the component container HTMLDivElement
	// This element contains all elements of our code component example
	private _container: HTMLDivElement;
	// Reference to PowerApps component framework Context object
	private _context: ComponentFramework.Context<IInputs>;

	// AddressFinder params
	private _country_code: string | null;
	private _options: object;

	// AddressFinder fields
	private _address_line_1: string;
	private _address_line_2: string;
	private _suburb: string; // NZ only
	private _city: string; // NZ only
	private _locality_name: string; // AU only
	private _state_territory: string; // AU only
	private _postcode: string;
	private _country: string;
	private _latitude: string;
	private _longitude: string;

	// AddressFinder widget
	private AddressFinder: any;
	private Widget: any;

	/**
	 * Constructor.
	 */
	constructor() {
		this.AddressFinder = require("./widget");
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling "setControlState" in the Mode interface.
	 * @param container If a control is marked control-type="standard", it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._context = context;
		this._notifyOutputChanged = notifyOutputChanged;
		this._container = container;

		this._address_line_1 = this._context.parameters.address_line_1.raw != null ? this._context.parameters.address_line_1.raw : "";

		// Initialize the container
		this.initContainter();
		container = this._container;

		// Country code
		if (this._context.parameters.country_code.raw != null && this._context.parameters.country_code.raw != "")
			this._country_code = this._context.parameters.country_code.raw;
		else
			this._country_code = "NZ"

		// Options
		this._options = this.getOptions;

		// Initialize AddressFinder widget
		this.initAddressFinder();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._context = context;
		this._inputElement.value = this._address_line_1 == null ? "" : this._address_line_1;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {

		// return {
		// 	address_line_1: this._address_line_1,
		// 	address_line_2: this._address_line_2,
		// 	suburb: this._suburb,
		// 	city: this._city,
		// 	locality_name: this._locality_name,
		// 	state_territory: this._state_territory,
		// 	postcode: this._postcode,
		// 	country: this._country,
		// 	latitude: this._latitude,
		// 	longitude: this._longitude
		// };

		// Work around until MS bug 1505831 is resolved
		// see https://powerusers.microsoft.com/t5/PowerApps-Component-Framework/BUG-Non-required-parameters-not-bound/td-p/307838
		
		var output: { [k: string]: any } = {};

		if (this._context.parameters.address_line_1.type != null)
			output.address_line_1 = this._address_line_1;

		if (this._context.parameters.address_line_2.type != null)
			output.address_line_2 = this._address_line_2;

		if (this._context.parameters.suburb.type != null)
			output.suburb = this._suburb;

		if (this._context.parameters.city.type != null)
			output.city = this._city;

		if (this._context.parameters.locality_name.type != null)
			output.locality_name = this._locality_name;

		if (this._context.parameters.state_territory.type != null)
			output.state_territory = this._state_territory;

		if (this._context.parameters.postcode.type != null)
			output.postcode = this._postcode;

		if (this._context.parameters.country.type != null)
			output.country = this._country;

		if (this._context.parameters.latitude.type != null)
			output.latitude = this._latitude;

		if (this._context.parameters.longitude.type != null)
			output.longitude = this._longitude;

		return output;
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}

	/** 
	 * Initializes the AddressFinder JavaScript widget.
	 */
	private initAddressFinder(): void {
		this.Widget = new this.AddressFinder.Widget(
			document.getElementById("addressfinder_search"),
			this._context.parameters.api_key.raw,
			this._country_code,
			this._options
		);

		switch (this._country_code) {
			case "AU":
				this.Widget.on("result:select", (fullAddress: any, metaData: any) => {
					this._address_line_1 = metaData.address_line_1;
					this._address_line_2 = metaData.address_line_2;
					this._locality_name = metaData.locality_name;
					this._state_territory = metaData.state_territory;
					this._postcode = metaData.postcode;
					this._country = "Australia";
					this._latitude = metaData.latitude;
					this._longitude = metaData.longitude;
					this._notifyOutputChanged();
				});
				break;
			default: // NZ
				this.Widget.on("result:select", (fullAddress: any, metaData: any) => {
					var selected = new this.AddressFinder.NZSelectedAddress(fullAddress, metaData);
					this._address_line_1 = selected.address_line_1();
					this._address_line_2 = selected.address_line_2();
					this._suburb = selected.suburb();
					this._city = selected.city();
					this._postcode = selected.postcode();
					this._country = "New Zealand";
					this._latitude = selected.metaData.y;
					this._longitude = selected.metaData.x;
					this._notifyOutputChanged();
				});
				break;
		}
	};

	/** 
	 * Initializes the the container by constructing it's contents.
	 */
	private initContainter(): void {
		this._inputElement = document.createElement("input");
		this._inputElement.setAttribute("id", "addressfinder_search");
		this._inputElement.setAttribute("type", "text");
		this._inputElement.value = this._address_line_1;
		this._container.appendChild(this._inputElement);
	}

	/** 
	 * Build the AddressFinder options object.
	 * @returns an object containing the AddressFinder Widget options
	 */
	private getOptions(): object {
		var options: { [k: string]: any } = {};
		options.address_params = {};

		// Empty content
		if (this._context.parameters.options_empty_content.raw != null && this._context.parameters.options_empty_content.raw != "")
			options.empty_content = this._context.parameters.options_empty_content.raw;

		// Ignore returns
		if (this._context.parameters.options_ignore_returns.raw == "false")
			options.ignore_returns = false;

		// Max results
		if (this._context.parameters.options_max_results.raw != null)
			options.max_results = this._context.parameters.options_max_results.raw;

		// Show addresses
		if (this._context.parameters.options_show_addresses.raw == "false")
			options.show_addresses = false;

		// Show locations
		if (this._context.parameters.options_show_locations.raw == "true")
			options.show_locations = true;

		// Show nearby
		if (this._context.parameters.options_show_nearby.raw == "true")
			options.show_nearby = true;

		// Show points of interest
		if (this._context.parameters.options_show_points_of_interest.raw == "true")
			options.show_points_of_interest = true;

		return options;
	}
}
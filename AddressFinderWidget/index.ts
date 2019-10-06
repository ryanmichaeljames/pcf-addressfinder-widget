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

	// AddressFinder fields
	private _address_line_1: string;
	private _address_line_2: string;
	private _city: string;
	private _suburb: string;
	private _postcode: string;
	private _country: string;

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
		return {
			address_line_1: this._address_line_1,
			address_line_2: this._address_line_2,
			city: this._city,
			suburb: this._suburb,
			postcode: this._postcode,
			country: this._country,
		};
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
			"NZ"
		);

		this.Widget.on("result:select", (fullAddress: any, metaData: any) => {
			this._address_line_1 = metaData.address_line_1 != null ? metaData.address_line_1 : "";
			this._address_line_2 = metaData.address_line_2 != null ? metaData._address_line_2 : "";
			this._city = metaData.city != null ? metaData.city : "";
			this._suburb = metaData.suburb != null ? metaData.suburb : "";
			this._postcode = metaData.postcode != null ? metaData.postcode : "";
			this._country = "New Zealand";
			this._notifyOutputChanged();
		});
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
}
# PCF AddressFinder Widget

The PCF AddressFinder Widget is a [PowerApps Component Framework](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/overview) (PCF) control for Dynamics 365 and Common Data Service (CDS) the uses the [AddressFinder JavaScript Widget](https://addressfinder.nz/docs/widget_docs/) to search for New Zealand addresses.

![Demo](/docs/images/demo.gif?raw=true)

## Getting Started

To get a local copy up and running, follow these steps...

### Prerequisites

- [Node.js](https://nodejs.org)
- [.NET Framework 4.6.2](https://dotnet.microsoft.com/download/dotnet-framework/net462)
- [.NET Core 2.2 SDK](https://dotnet.microsoft.com/download/dotnet-core/2.2)
- [Visual Studio Code](https://code.visualstudio.com/Download)
- [Microsoft PowerApps CLI](https://aka.ms/PowerAppsCLI)
- [AddressFinder](https://addressfinder.nz) API key

### Installation

1. Signup for a free [AddressFinder](https://addressfinder.nz) plan and get an API key
2. Clone the repo
```
git clone https://github.com/ryanmichaeljames/pcf-addressfinder-widget.git
```
3. Navigate to the `src` folder
```
cd src
```
4. Install the NPM packages.
```
npm install
```

### Resources

The following resources should be of help when contributing:
- [Create and build a code component](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/create-custom-controls-using-pcf)
- [Debug code components](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/debugging-custom-controls)
- [Package a code component](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/import-custom-controls)

## Usage

To install and use the AddressFinder Widget control within your Dynamics 365 or CDS instance, follow these steps...

### Installation

1. Download the [latest release](https://github.com/ryanmichaeljames/pcf-addressfinder-widget/releases/latest).
2. Import the solution `AddressFinderWidget_x_x_managed.zip` file into your Dynamics 365 or CDS instance.
3. Add the `AddressFinder Widget` control to the desired entity form.
4. Add your AddressFinder API key to the `API Key` property. If you don't already have an API key you can register for a free account that gives you 500 free lookups a month.
5. Map the entity's address attributes to the AddressFinder Widget's address properties.

> There is a know issue where you cannot map account and contact address attributes to a PCF control's properties. Until this issue is resolved by Microsoft you can use the **FormXml Manager** plugin in the [XrmToolBox](https://www.xrmtoolbox.com) to map the address attributes to the AddressFinder Widget control's properties. See [Binding to Address Fields in a PCF Control](https://www.magnetismsolutions.com/blog/jaredjohnson/2019/07/04/binding-to-address-fields-in-a-pcf-control).

### Optional Properties

The following AddressFinder options are optional.

Property | Type | Default | Description
--- | --- | --- | ---
Country Code | String | `NZ` | The code of the country to search against. Supported country codes are `NZ` and `AU`.
Option: Empty Content | String | `No addresses were found. This could be a new address, or you may need to check the spelling.` | Message to display to users when there are no found addresses or locations.
Option: Ignore Returns | Boolean | `true` | Ignore the use of the enter key when no list item is selected.
Option: Max Results | Integer | `10` | Maximum number of results to display.
Option: Show Addresses | Boolean | `true` | Set to false to hide address results.
Option: Show Locations | Boolean | `false` | Set to true to return location (street, suburb, city and region) results.
Option: Show Nearby | Boolean | `false` | Enable the nearby address helper (uses device's GPS to suggest addresses at current location). This feature is only available for New Zealand addresses.
Option: Show Points of Interest | Boolean | `false` | Set to true to return points of interest (e.g. hospitals, schools and churches) results. This feature is only available for New Zealand addresses.

> For more information regarding the AddressFinder options see the options section of the AddressFinder Widget [documentation](https://addressfinder.nz/docs/widget_docs).


## Roadmap

See the [issues](https://github.com/ryanmichaeljames/pcf-addressfinder-widget/issues) for a list of proposed features (and known issues).

## Contributing

Any contributions are more than welcome. 😄
1. Fork the project
2. Create a feature branch
```
git checkout -b feature/my-feature
```
3. Commit your changes
```
git commit -m 'Added my feature'
```
4. Push the feature branch to origin
```
git push origin feature/my-feature
```
5. Open a pull request

## Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions available, see [tags](https://github.com/ryanmichaeljames/pcf-addressfinder-widget/tags). 

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE) more information.

## Acknowledgements

- [AddressFinder JavaScript Widget](https://addressfinder.nz/docs/widget_docs)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
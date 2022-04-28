# Android Challenge - Jobsity

## General information

The app wasimplemented using **`React-Native`** with **`Typescript`**

All the mandatory functionalities were implemented:

- Main screen that shows all serie cards with bottom pagination component.<p>
- Search bar is optional, in case of blank it shows all series.<p>
- The listing shows the Poster (if available) and the Name of the serie.<p>
- By clicking a Series a modal screen shows its details:
    - Name
    - Poster (if available)
    - Days and time during which the series airs
    - Genres
    - Summary
    - Dropdown list for choosing one of the avaibable Seasons
    - The list of Episodes (links) for the selected Season <p>
- By clicking an Episode link a modal screen shows its details:
    - Name
    - Number
    - Season number
    - Poster (if available)
    - Summary<p>

## Some of the packages used

- **`"@react-navigation/native"`** and **`@react-navigation/native-stack"`**<br>
    Although the app has only one root screen (the other are modal views withn the maind one), I've added navigation support in case I had time to implement more optional screens. 
    
- **`"i18n-js"`** <br>
    There is no hardcoded strings within the code. All strings are translated according to the devices's language using the content of the files en-US.ts (English) and pt-BR.ts (Portuguese). English is used as default for other device's languages.

- **`"axios"`** <br>
    Used to make all requests to TVMAZE API.

- **`"react-redux"`** <br>
    All the communication between screens are done via **`Redux`**.

- **`"react-native-render-html"`** <br>
    Used to render the HTML content from the Series/Episodes summaries.

- **`"react-native-reanimated"`** <br>
    The Modal views for the Series/Episodes details are animated.

- **`"react-native-dropdown-picker"`** <br>
    Used to select a season from the Series detail screen.










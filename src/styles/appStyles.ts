import { ComponentColors } from './colors';
import { StyleSheet, 
    Platform, 
    StatusBar, 
    Dimensions, 
    StyleProp, 
    ViewStyle, 
    TextStyle, 
    ImageStyle, 
} from 'react-native';


//Constants
const screenWidthRatio = Dimensions.get('window').width / 320;

const EXTRA_SMALL_FONT_SIZE = Math.round(7 * screenWidthRatio);
const SMALL_FONT_SIZE = Math.round(10 * screenWidthRatio);
const MEDIUM_FONT_SIZE = Math.round(13 * screenWidthRatio);
const LARGE_FONT_SIZE = Math.round(16 * screenWidthRatio);
const HUGE_FONT_SIZE = Math.round(25 * screenWidthRatio);

const LOGO_WIDTH = Math.round(100 * screenWidthRatio);
const LOGO_HEIGHT = Math.round(30 * screenWidthRatio);

const HEADER_HEIGHT = Math.round(40 * screenWidthRatio);

const INPUT_CONTAINER_HEIGHT = Math.round(45 * screenWidthRatio);
const INPUT_ICON_WIDTH = Math.round(30 * screenWidthRatio);
const INPUT_ICON_HEIGHT = Math.round(30 * screenWidthRatio);

const TEXT_INPUT_HEIGHT = Math.round(30 * screenWidthRatio);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;


//BASE STYLES: To be used as base for different theme style (LightStyle, DarkStyle, etc)

const baseBackground: StyleProp<ViewStyle> = {
    flex: 1,
    width: "100%",
    backgroundColor: ComponentColors.LightContentBackground,
};

const baseCenteredView: StyleProp<ViewStyle> = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
};

const baseContainer: StyleProp<ViewStyle> = {
    flex: 1,
    marginTop: Platform.select({ ios: 8, android: 0 }),
    width: "100%",
};

const baseContent: StyleProp<ViewStyle> = {
    flex: 1000,
    backgroundColor: ComponentColors.LightContentBackground,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignContent: 'stretch',
    alignSelf: 'stretch'
};

const baseHeader: StyleProp<TextStyle> = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    textAlign: 'center',
    height: HEADER_HEIGHT,
    margin: 0,
    backgroundColor: ComponentColors.LightHeaderBackgroundColor,
};

const baseInputIcon: StyleProp<ImageStyle> = {
    padding: 5,
    width: INPUT_ICON_WIDTH,
    height: INPUT_ICON_HEIGHT,
    justifyContent: 'center'
};

const baseLogoImage: StyleProp<ImageStyle> = {
    margin: 0,
    padding:0,
    width:LOGO_WIDTH,
    height:LOGO_HEIGHT,
    alignSelf: 'center',
    backgroundColor: 'transparent'
}

const baseSearchContainer: StyleProp<ViewStyle> = {
    flex: 1,
    marginTop: 100,
    marginBottom: 100,
    marginLeft: 20,
    marginRight: 20,
};

const baseSearchInput: StyleProp<TextStyle> = {
    height: 40,
    fontSize: MEDIUM_FONT_SIZE,
    width: '90%',
    // borderColor: ComponentColors.borderColor,
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15,
};

const baseScrollView: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
};

const baseStatusBar: StyleProp<ViewStyle> = {
    height: STATUSBAR_HEIGHT,
}

const baseTextInput: StyleProp<TextStyle> = {
    fontSize: MEDIUM_FONT_SIZE,
    borderWidth: 1,
    borderColor: "gray",
    textAlign: 'center',
    textAlignVertical: 'center',
    height: TEXT_INPUT_HEIGHT,
    padding: 0,
    margin: 2,
    borderRadius: 5
};

const baseTextFieldLabel: StyleProp<TextStyle> = {
    textAlignVertical: 'center',
    fontSize: SMALL_FONT_SIZE,
    textAlign: 'left'
};

const baseTextLabel: StyleProp<TextStyle> = {
    textAlignVertical: 'center',
    fontSize: MEDIUM_FONT_SIZE,
    textAlign: 'left',
    // color: ComponentColors.textLabel,
};

const baseViewHorizontalCentered: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
};

const baseViewHorizontalLeft: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
};

const baseViewHorizontalRight: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
};

const baseViewHorizontalSpaceBetween: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
};

const baseViewHorizontalSpaceAround: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
};


// LIGHT STYLES
const styles = StyleSheet.create({

    background: {
        ...baseBackground,
    },

    centeredView: {
        ...baseCenteredView,
    },

    container: {
        ...baseContainer,
    },

    content: {
        ...baseContent,
    },

    header: {
        ...baseHeader,
    },

    baseInputIcon: {
        ...baseInputIcon,
    },

    logoImage: {
        ...baseLogoImage,
    },

    searchContainer: {
        ...baseSearchContainer,
    },

    searchInput: {
        ...baseSearchInput,
    },

    scrollView: {
        ...baseScrollView,
    },

    statusBar: {
        ...baseStatusBar,
    },

    textInput: {
        ...baseTextInput,
    },

    textFieldLabel: {
        ...baseTextFieldLabel,
    },

    textLabel: {
        ...baseTextLabel,
    },

    viewHorizontalCentered: {
        ...baseViewHorizontalCentered
    },

    viewHorizontalLeft: {
        ...baseViewHorizontalLeft
    },

    viewHorizontalRight: {
        ...baseViewHorizontalRight
    },

    viewHorizontalSpaceAround: {
        ...baseViewHorizontalSpaceAround,
    },

    viewHorizontalSpaceBetween: {
        ...baseViewHorizontalSpaceBetween,
    },
})

export default styles;

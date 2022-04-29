/**
 * appStyles.ts
 * Holds all components styling
 * The contains base StyleProps for each type of component to be used as base for StyleSheets themes
 */

import { ComponentColors } from './colors';
import {
    StyleSheet,
    Platform,
    StatusBar,
    Dimensions,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from 'react-native';


//Constants
export const screenWidthRatio = Dimensions.get('window').width / 320;

export const EXTRA_SMALL_FONT_SIZE = Math.round(7 * screenWidthRatio);
export const SMALL_FONT_SIZE = Math.round(10 * screenWidthRatio);
export const MEDIUM_FONT_SIZE = Math.round(13 * screenWidthRatio);
export const LARGE_FONT_SIZE = Math.round(16 * screenWidthRatio);
export const HUGE_FONT_SIZE = Math.round(25 * screenWidthRatio);

export const LOGO_WIDTH = Math.round(100 * screenWidthRatio);
export const LOGO_HEIGHT = Math.round(30 * screenWidthRatio);

export const CARD_IMAGE_WIDTH = Math.round(100 * screenWidthRatio);
export const CARD_IMAGE_HEIGHT = Math.round(100 * screenWidthRatio);

export const CLOSE_BUTTON_WIDTH = Math.round(100 * screenWidthRatio);

export const HEADER_HEIGHT = Math.round(40 * screenWidthRatio);

export const INPUT_CONTAINER_HEIGHT = Math.round(45 * screenWidthRatio);
export const INPUT_ICON_WIDTH = Math.round(30 * screenWidthRatio);
export const INPUT_ICON_HEIGHT = Math.round(30 * screenWidthRatio);

export const PAG_BUTTON_WIDTH = Math.round(25 * screenWidthRatio);
export const PAG_BUTTON_HEIGHT = Math.round(25 * screenWidthRatio);

export const TEXT_INPUT_HEIGHT = Math.round(30 * screenWidthRatio);

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;


//BASE STYLES: To be used as base for different theme style (LightStyle, DarkStyle, etc)

const baseBackground: StyleProp<ViewStyle> = {
    flex: 1,
    width: "100%",
};

const baseCardView: StyleProp<ViewStyle> = {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'stretch',
    margin: 5,
    borderRadius: 10,
};

const baseCardImage: StyleProp<ImageStyle> = {
    width: CARD_IMAGE_WIDTH,
    height: CARD_IMAGE_HEIGHT,
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
}

const baseCardText: StyleProp<TextStyle> = {
    flex: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    fontSize: MEDIUM_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
};

const baseCenteredView: StyleProp<ViewStyle> = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
};

const baseCloseButton: StyleProp<ViewStyle> = {
    width: CLOSE_BUTTON_WIDTH,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
};

const baseContainer: StyleProp<ViewStyle> = {
    flex: 1,
    marginTop: Platform.select({ ios: 8, android: 0 }),
    width: "100%",
};

const baseContent: StyleProp<ViewStyle> = {
    flex: 1000,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignContent: 'stretch',
    alignSelf: 'stretch'
};

const baseDetailImage: StyleProp<ImageStyle> = {
    margin: 0,
    padding: 0,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    alignSelf: 'center',
}

const baseEpisodeDetails: StyleProp<TextStyle> = {
    flex: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    fontSize: MEDIUM_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
};

const baseHeader: StyleProp<TextStyle> = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    textAlign: 'center',
    height: HEADER_HEIGHT,
    margin: 0,
};

const baseInputIcon: StyleProp<ImageStyle> = {
    padding: 5,
    width: INPUT_ICON_WIDTH,
    height: INPUT_ICON_HEIGHT,
    justifyContent: 'center'
};

const baseLink: StyleProp<TextStyle> = {
    textAlignVertical: 'center',
    fontSize: MEDIUM_FONT_SIZE,
    textAlign: 'center',
    color: ComponentColors.LightTextLink,
};

const baseLogoImage: StyleProp<ImageStyle> = {
    margin: 0,
    padding: 0,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    alignSelf: 'center',
};

const baseModalContainer: StyleProp<ViewStyle> = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute'
};

const baseModalView: StyleProp<ViewStyle> = {
    bottom: 0,
    position: 'absolute',
    height: '90%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25
};

const baseModalViewIndicator: StyleProp<ViewStyle> = {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5
};

const basePagination: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
};

const basePaginationButton: StyleProp<ViewStyle> = {
    // width: PAG_BUTTON_WIDTH,
    height: PAG_BUTTON_HEIGHT,
    borderRadius: 3,
    margin: 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
};

const basePaginationSelectedNumberText: StyleProp<TextStyle> = {
    textAlignVertical: 'center',
    fontSize: LARGE_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 3,
    borderWidth: 0,
};

const basePaginationNumberText: StyleProp<TextStyle> = {
    textAlignVertical: 'center',
    fontSize: MEDIUM_FONT_SIZE,
    textAlign: 'center',
    margin: 3,
    borderWidth: 0,
};

const basePaginationNumberView: StyleProp<ViewStyle> = {
    // width: PAG_BUTTON_WIDTH,
    height: PAG_BUTTON_HEIGHT,
    margin: 3,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
};

const baseSearchContainer: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
};

const baseSeriesDetails: StyleProp<TextStyle> = {
    flex: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    fontSize: MEDIUM_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
};

const baseSerieName: StyleProp<TextStyle> = {
    flex: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    fontSize: LARGE_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
};

const baseSeparator: StyleProp<ViewStyle> = {
    width: '100%',
    height: 1,
};

const baseScrollView: StyleProp<ViewStyle> = {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
};

const baseSummaryView: StyleProp<ViewStyle> = {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'stretch',
    margin: 0,
    padding: 10,
    borderRadius: 10,
};

const baseStatusBar: StyleProp<ViewStyle> = {
    height: STATUSBAR_HEIGHT,
}

const baseTextButton: StyleProp<TextStyle> = {
    textAlignVertical: 'center',
    fontSize: MEDIUM_FONT_SIZE,
    textAlign: 'left',
};

const baseTextInput: StyleProp<TextStyle> = {
    fontSize: MEDIUM_FONT_SIZE,
    textAlign: 'left',
    textAlignVertical: 'center',
    height: TEXT_INPUT_HEIGHT,
    padding: 0,
    margin: 2,
    
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
        backgroundColor: ComponentColors.LightContentBackground,
    },

    cardView: {
        ...baseCardView,
        backgroundColor: ComponentColors.LightCardBackground,
    },

    cardImage: {
        ...baseCardImage,
    },

    cardText: {
        ...baseCardText,
        color: ComponentColors.LightCardText,
        backgroundColor: 'transparent',
    },

    centeredView: {
        ...baseCenteredView,
    },

    closeButton: {
        ...baseCloseButton,
        backgroundColor:ComponentColors.LightTabBarBackground,
    },

    container: {
        ...baseContainer,
    },

    content: {
        ...baseContent,
        backgroundColor: ComponentColors.LightContentBackground,
    },

    detailImage: {
        ...baseDetailImage,
    },

    episodeDetails: {
        ...baseEpisodeDetails,
        color: ComponentColors.LightSerieName,
    },

    header: {
        ...baseHeader,
        backgroundColor: ComponentColors.LightHeaderBackgroundColor,
    },

    inputIcon: {
        ...baseInputIcon,
    },

    link: {
        ...baseLink,
    },

    logoImage: {
        ...baseLogoImage,
        backgroundColor: 'transparent'
    },

    modalContainer: {
        ...baseModalContainer
    },

    modalView: {
        ...baseModalView,
    },

    modalViewIndicator: {
        ...baseModalViewIndicator
    },

    pagination: {
        ...basePagination,
    },

    paginationButton: {
        ...basePaginationButton,
        borderColor: ComponentColors.LightPaginationButtonBorder,
        backgroundColor: ComponentColors.LightPaginationButtonBackground,
    },

    paginationNumberTextLink: {
        ...basePaginationNumberText,
        color: ComponentColors.LightPaginationTextLink,
    },

    paginationNumberText: {
        ...basePaginationNumberText,
        color: ComponentColors.LightPaginationText,
    },

    paginationSelectedNumberText: {
        ...basePaginationSelectedNumberText,
        color: ComponentColors.LightPaginationText,
    },

    paginationNumberView: {
        ...basePaginationNumberView,
        backgroundColor: 'transparent',
    },

    searchContainer: {
        ...baseSearchContainer,
    },

    serieName: {
        ...baseSerieName,
        color: ComponentColors.LightSerieName,
    },

    
    serieDetails: {
        ...baseSeriesDetails,
        color: ComponentColors.LightSerieName,
    },

    scrollView: {
        ...baseScrollView,
        backgroundColor: ComponentColors.LightScrollViewBackground,
    },

    separator: {
        ...baseSeparator,
        backgroundColor: ComponentColors.LightSeparator,
    },

    summaryView: {
        ...baseSummaryView,
        backgroundColor: ComponentColors.LightSummaryBackground,
    },

    statusBar: {
        ...baseStatusBar,
    },

    textButton: {
        ...baseTextButton,
        color: ComponentColors.LightTabBarText
    },

    textInput: {
        ...baseTextInput,
        color: ComponentColors.LightTextInput
    },

    textFieldLabel: {
        ...baseTextFieldLabel,
    },

    textLabel: {
        ...baseTextLabel,
        color:ComponentColors.LightSerieName,
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

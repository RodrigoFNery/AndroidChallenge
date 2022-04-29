/**
 * Card.tsx
 * Renders the Series card with basic info only 
 */

import React, { FC, } from "react";
import {
    View,
    Image,
    ViewProps,
    TouchableOpacity,
    ImageURISource,
    Text
} from "react-native";

//Entities
import CardModel from "../model/CardModel";

//Styling
import styles from '../styles/appStyles';


//Redux
import { connect } from "react-redux";
import { AppState } from '../redux/reducers/appReducer';

//Interface
interface CardProps extends ViewProps {
    cardModel: CardModel;
    onPress: Function;
}

type Props = ReduxType & CardProps;

const Card: React.FC<Props> = ({
    cardModel,
    onPress,
    favoriteSeriesIds,
}) => {
    const imageURISource: ImageURISource = {
        uri: cardModel ? (cardModel.image ? cardModel.image.medium : undefined) : undefined
    }

    const imageSource: ImageURISource = imageURISource.uri == undefined ? require("../images/image-not-found.png") : imageURISource;

    const imagePath = favoriteSeriesIds ? favoriteSeriesIds.indexOf(cardModel.id.toString()) > -1 ? require('../images/heart_full.png') : require('../images/heart_empty.png') :require('../images/heart_empty.png'); 

    return (
        <TouchableOpacity onPress={() => onPress()}>
        <View style={styles.cardView}>
                <Image
                    style={{
                        ...styles.cardImage, 
                    }}
                    source={imageSource}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardText}>{cardModel.name}</Text>
                    <Image style={{
                        width: 20,
                        height: 20, 
                    }}
                    source={imagePath}
                />

                </View>
                
        </View>
        </TouchableOpacity>
    );
}

const mapStateToProps = (appState: AppState) => {
    return (
      {
        favoriteSeriesIds: appState.favoriteSeriesIds,
      }
    )
  };
  
  type ReduxType = ReturnType<typeof mapStateToProps>;
  
  export default connect(mapStateToProps)(Card);
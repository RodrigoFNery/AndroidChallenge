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

//Interface
interface CardProps extends ViewProps {
    cardModel: CardModel;
}

const Card: React.FC<CardProps> = ({
    cardModel
}) => {
    const imageURISource: ImageURISource = {
        uri: cardModel ? (cardModel.image ? cardModel.image.medium : undefined ) : undefined
    }

    const imageSource:ImageURISource = imageURISource.uri == undefined ? require("../images/image-not-found.png") : imageURISource;

    return (
        <View style={styles.cardView}>
            <TouchableOpacity>
                <Image
                    style={styles.cardImage}
                    source={imageSource}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardText}>{cardModel.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Card;
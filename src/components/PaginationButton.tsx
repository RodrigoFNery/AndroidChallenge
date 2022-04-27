/**
 * PaginationButton.tsx
 * Renders the pagination buttons
 */

import React, { FC, } from "react";
import {
    View,
    ViewProps,
    TouchableOpacity,
    Text
} from "react-native";

//Styling
import styles from '../styles/appStyles';
import { PAG_BUTTON_WIDTH } from '../styles/appStyles';

//Interface
interface PaginationButtonProps extends ViewProps {
    text: string,
    enabled: boolean;
    showBorder?: boolean;
    onClick?: Function;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
    text,
    enabled,
    showBorder = true,
    onClick = () => { },
}) => {
    const buttonStyle = showBorder ? ({ ...styles.paginationButton, borderWidth: 1, width: PAG_BUTTON_WIDTH }) : ({ ...styles.paginationButton, borderWidth: 0, backgroundColor: 'transparent' });
    if (enabled) {
        return (
            <TouchableOpacity onPress={() => onClick()}>
                <View style={buttonStyle}>
                    <Text style={styles.paginationNumberTextLink}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <View style={buttonStyle}>
                <Text style={styles.paginationNumberText}>{text}</Text>
            </View>
        );
    }
}

export default PaginationButton;
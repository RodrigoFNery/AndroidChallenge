import React, { FC, } from "react";
import { View,
    Image 
} from "react-native";

//Styling
import styles from '../styles/appStyles';

const Header: React.FC = () => {
    return (
        <View style={{ ...styles.header }}>
            <Image style={styles.logoImage} source={require("../images/tvm-header-logo.png")} />
        </View>
    );
}

export default Header;
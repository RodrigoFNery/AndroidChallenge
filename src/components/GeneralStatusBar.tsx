import React from 'react';
import { View, 
    StatusBar, 
    ViewProps, 
    StatusBarStyle 
} from 'react-native';

//Styling
import styles from '../styles/appStyles';

//Components
import { ComponentColors } from '../styles/colors';

//Interface
interface StatusBarProps extends ViewProps {
    backgroundColor?: string;
    barStyle?: StatusBarStyle;
}

const GeneralStatusBar: React.FC<StatusBarProps> = ({
    backgroundColor = ComponentColors.LightStatusBarBackground,
    barStyle,
}) => {
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <StatusBar translucent backgroundColor={backgroundColor} barStyle={barStyle} />
        </View>
    )
};

export default GeneralStatusBar;
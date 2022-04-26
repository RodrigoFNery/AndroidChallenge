/**
 * React Native - Typescript
 * Android Challenge - Jobsity
 */

import React from 'react';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screen
import Home from './src/screens/Home';

//Styling
import GeneralStatusBar from './src/components/GeneralStatusBar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <GeneralStatusBar barStyle="light-content"/>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown:false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

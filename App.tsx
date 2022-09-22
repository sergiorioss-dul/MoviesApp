import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import { FadeScreen } from './src/screens/FadeScreen';
import { GradientProvider } from './src/context/GradientContext';


const App = () => {

  return(
    <NavigationContainer>
      <GradientProvider>
        <Navigation />
      </GradientProvider>
    </NavigationContainer>
  )
};

export default App;
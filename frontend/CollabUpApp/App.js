import React from 'react'

import Navigator from './components/navigator';

import { Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Nobile_400Regular, Nobile_700Bold } from '@expo-google-fonts/nobile';
import { Raleway_700Bold } from '@expo-google-fonts/raleway';
import { View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { UserProvider } from './context/user-context';


export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    PlayfairDisplay_400Regular,
    Nobile_400Regular,
    Nobile_700Bold,
    Raleway_700Bold
  })
  if (!fontsLoaded) {
    return undefined
  }
  return (
    <View style={{ flex: 1}}>
      <UserProvider>
        <Navigator/>
        <FlashMessage/>
      </UserProvider>
    </View>
  );
  }
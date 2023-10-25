//source: https://javascript.plainenglish.io/bottom-tab-navigation-like-instagram-using-react-native-expo-96dec9279eaa

import React, { Component } from 'react'
import Dashboard from '../screens/DashboardPage/DashboardPage';
import Interaction from '../screens/InteractionPage/InteractionPage';
import Profile from '../screens/ProfilePage/ProfilePage';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

// source: https://stackoverflow.com/questions/74719540/how-can-i-remove-the-rounded-shape-around-my-selected-tab-text 

import {
    MD3LightTheme as DefaultTheme,
    Provider as PaperProvider,
  } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: "#2D9CDB",
    },
};

const Tab = createMaterialBottomTabNavigator();


export default function Navigator() {
  return (
  <NavigationContainer>
    <PaperProvider theme={theme}>
  <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'black' }} 
activeColor="white" 
>
  <Tab.Screen name="Dashboard" component={Dashboard}           
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
        ),
    }}/>
  <Tab.Screen name="Interaction" component={Interaction} 
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="arrow-left-right-bold" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Profile" component={Profile}  
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} 
size={26}/>
        ),
    }}/>
  </Tab.Navigator>
  </PaperProvider>
  </NavigationContainer>
  );
  }
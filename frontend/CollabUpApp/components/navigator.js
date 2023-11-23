//source: https://javascript.plainenglish.io/bottom-tab-navigation-like-instagram-using-react-native-expo-96dec9279eaa

import React, { Component } from 'react'
import Dashboard from '../screens/DashboardPage/DashboardPage';
import Interaction from '../screens/InteractionPage/InteractionPage';
import Profile from '../screens/ProfilePage/ProfilePage';
import Welcome from '../screens/WelcomePage/WelcomePage';
import Login from '../screens/LoginPage/LoginPage';
import CreateAccount from '../screens/CreateAccountPage/CreateAccountPage';
import DateOfBirth from '../screens/DateOfBirthPage/DateOfBirthPage';
import PersonalDetails1 from '../screens/PersonalDetails1Page/PersonalDetails1Page';
import PersonalDetails2 from '../screens/PersonalDetails2Page/PersonalDetails2Page';
import UploadPicture from '../screens/UploadPicturesPage/UploadPicturePage';
import { PostProvider } from '../context/post-context';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

// source: https://stackoverflow.com/questions/74719540/how-can-i-remove-the-rounded-shape-around-my-selected-tab-text 

import {
    MD3LightTheme as DefaultTheme,
    Provider as PaperProvider,
  } from "react-native-paper";
import { useUserContext } from '../context/user-context';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: "#2D9CDB",
    },
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Home() {
  const [user, setUser] = useUserContext()
  return (
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'black' }} activeColor="white">
        <Tab.Screen name="Dashboard" component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26}/>
            ),
        }}/>
        {/* <Tab.Screen name="Interaction" component={Interaction}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="arrow-left-right-bold" color={color} size={26}/>
            ),
        }}/> */}
        {/* <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={26}/>
            ),
        }}/> */}
    </Tab.Navigator>
  )
}

export default function Navigator() {
  return (
  <NavigationContainer>
    <PaperProvider theme={theme}>
      <PostProvider>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}}/>
        <Stack.Screen name="DateOfBirth" component={DateOfBirth} options={{headerShown: false}}/>
        <Stack.Screen name='PersonalDetails1' component={PersonalDetails1} options={{headerShown: false}}/>
        <Stack.Screen name='PersonalDetails2' component={PersonalDetails2} options={{headerShown: false}}/>
        <Stack.Screen name="UploadPicture" component={UploadPicture} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{
              headerShown: false, // Hide the title of the Home screen
            }}/>
      </Stack.Navigator>
      </PostProvider>
  </PaperProvider>
  </NavigationContainer>
  );
  }
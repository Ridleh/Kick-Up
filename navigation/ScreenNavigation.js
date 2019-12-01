import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import CreateGameScreen from '../screens/CreateGame';
import HomeScreen from '../screens/HomeScreen';
import JoinGameScreen from '../screens/JoinGame';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfilePageScreen from '../screens/ProfilePage';
import MainTabNavigator from '../navigation/MainTabNavigator';
import MapScreen from '../screens/MapScreen';

//not used
const screenStack = createStackNavigator({
    MainTab: MainTabNavigator,
    CreateGame: CreateGameScreen,
    Home: HomeScreen,
    JoinGame: JoinGameScreen,
    Loading: LoadingScreen,
    Login: LoginScreen,
    Profile: ProfilePageScreen,
    Maps: MapScreen

});

export default screenStack
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
<<<<<<< Updated upstream
=======
import LogInScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'

// Not used
import ScreenNavigation from '../navigation/ScreenNavigation'
>>>>>>> Stashed changes

// Our stacks
const AppStack = createStackNavigator({ MainTabNavigator: MainTabNavigator});
const AuthStack = createStackNavigator({ LogIn: LogInScreen });


export default createAppContainer(
  createSwitchNavigator({
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
<<<<<<< Updated upstream
    Main: MainTabNavigator,
=======
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
>>>>>>> Stashed changes
  })
);

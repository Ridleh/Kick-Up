import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreateGameScreen from '../screens/CreateGame';
import JoinGameScreen from '../screens/JoinGame';
import ModalExampleScreen from '../screens/ModalExample';
import LoginScreen from '../screens/LoginScreen';
import ProfilePageScreen from '../screens/ProfilePage';
import DetailsScreen from '../screens/DetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
  header: null
});

const HomeStack = createStackNavigator( 
  {
    Home: HomeScreen,
    Profile: ProfilePageScreen,
    Details: DetailsScreen,
    JoinGame: JoinGameScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen, 
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const CreateGameStack = createStackNavigator(
  {
    CreateGame: CreateGameScreen,
  },
  config
);

CreateGameStack.navigationOptions = {
  tabBarLabel: 'Create Game',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

CreateGameStack.path = '';

const JoinGameStack = createStackNavigator(
  {
    JoinGame: JoinGameScreen,
  },
  config
);

JoinGameStack.navigationOptions = {
  tabBarLabel: 'Join Game',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

JoinGameStack.path = '';

const ModalExampleStack = createStackNavigator(
  {
    ModalExample: ModalExampleScreen,
  },
  config
);

ModalExampleStack.navigationOptions = {
  tabBarLabel: 'Join Game',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ModalExampleStack.path = '';

const LoginScreenStack = createStackNavigator(
  {
    Settings: LoginScreen, 
  },
  config
);

LoginScreenStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

LoginScreenStack.path = '';

const ProfilePageStack = createStackNavigator(
  {
    ProfilePage: ProfilePageScreen,
  },
  config
);

ProfilePageStack.navigationOptions ={
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ProfilePageStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CreateGameStack,
  JoinGameStack,
  ProfilePageStack,
});

tabNavigator.path = '';

export default tabNavigator;

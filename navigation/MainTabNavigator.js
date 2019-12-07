import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerActions } from 'react-navigation';
import {Icon, Header} from 'react-native-elements'

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
import NewProfilePage from '../screens/NewProfilePage';
import MapScreen from '../screens/MapScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ChatScreen from '../screens/ChatScreen';
import MyGames from '../screens/MyGames';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      name={'ios-home'}
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
    Maps: MapScreen,
    Home: HomeScreen
  },
  config
);

CreateGameStack.navigationOptions = {
  tabBarLabel: 'Create Game',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-create'} />
  ),
};

CreateGameStack.path = '';

const JoinGameStack = createStackNavigator(
  {
    JoinGame: JoinGameScreen,
    Home: HomeScreen,
    chat: ChatScreen,
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
    NewProfilePage: NewProfilePage,
    Login: LoginScreen,
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

const NewProfilePageStack = createStackNavigator(
  {
    NewProfilePage: NewProfilePage,
    Login: LoginScreen,
  },
  config
);

NewProfilePage.navigationOptions ={
  tabBarLabel: 'NewProfilePage',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

NewProfilePage.path = '';

const FriendsScreenStack = createStackNavigator(
  {
    Friends : FriendsScreen,
    profile : ProfilePageScreen,
    chat : ChatScreen
  },
  config
);

FriendsScreenStack.navigationOptions ={
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-people'} />
  ),
};

FriendsScreenStack.path = '';

const Menu = createDrawerNavigator({
    'Home' : {
      screen: HomeStack,
      navigationOptions: {
        drawerIcon: () => <Ionicons name="md-home" size={30} style={{ width: 24 }} 
        color="#000" />
      }
    },
    'My Games' : {
      screen: MyGames,
      navigationOptions: {
        drawerIcon: () => <Ionicons name="md-football" size={30} style={{ width: 24 }} 
        color="#000" />
      }
    },
    'Create a Game' : {
      screen: CreateGameStack,
      navigationOptions: {
        drawerIcon: () => <Ionicons name="md-add-circle" size={30} style={{ width: 24 }} 
        color="#000" />
      }
    },
    'My Friends' : {
      screen: FriendsScreenStack,
      navigationOptions: {
        drawerIcon: () => <Ionicons name="md-contacts" size={30} style={{ width: 24 }} 
        color="#000" />
      }
    },
    'My Profile' : {
      screen: ProfilePageStack,
      navigationOptions: {
        drawerIcon: () => <Ionicons name="md-contact" size={30} style={{ width: 24 }} 
        color="#000" />
      },
    } 
  },
  {
    drawerWidth: 230,
    drawerPosition: 'left',
    initialRouteName: 'Home',
  }

);


Menu.path = '';

export default Menu


const tabNavigator = createBottomTabNavigator({
  HomeStack, 
  CreateGameStack,
  FriendsScreenStack,
});

tabNavigator.path = '';

// export default tabNavigator;



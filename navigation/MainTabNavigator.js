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
<<<<<<< Updated upstream
=======
import DetailsScreen from '../screens/DetailsScreen';
import NewProfilePage from '../screens/NewProfilePage';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
import MapScreen from '../screens/MapScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ChatScreen from '../screens/ChatScreen';
import MyGames from '../screens/MyGames';
>>>>>>> Stashed changes

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
  header: null
});

const HomeStack = createStackNavigator( 
  {
    Home: HomeScreen,
<<<<<<< Updated upstream
=======
    Profile: ProfilePageScreen,
    Details: DetailsScreen,
    JoinGame: JoinGameScreen,
    Drawer: DrawerStack,
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
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

const { width } = Dimensions.get("window");

const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
        <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('./assets/no-image.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
        </View>
        <View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Text>John Doe</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{ alignItems: "center", bottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', marginRight: 15 }}>
            <Icon name="flask" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Icon name="call" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Profile: ProfilePageScreen,
    MyGames: MyGames,
  },
  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2
  }
);
Drawer.path = '';

//const Drawer = createAppContainer(DrawerStack);
>>>>>>> Stashed changes

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CreateGameStack,
  JoinGameStack,
  LoginScreenStack,
});

tabNavigator.path = '';

export default tabNavigator;

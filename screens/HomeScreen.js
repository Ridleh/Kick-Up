import * as WebBrowser from 'expo-web-browser';
import {FBFunctions} from '../API/Firebase';
import { firebaseConfig } from '../config';
import * as firebase from 'firebase';
<<<<<<< Updated upstream
=======
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation';

>>>>>>> Stashed changes

import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  SafeAreaView,
  Dimensions,
  Alert
} from 'react-native';

import Constants from 'expo-constants';
import { Header, ListItem, Card, Button, Icon } from 'react-native-elements';
import { fetchUpdateAsync } from 'expo/build/Updates/Updates';
import { createDrawerNavigator, DrawerItems, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';

//import { watchFile } from 'fs';

let devicewWidth = Dimensions.get('window').width;

const list = [
  {
    title: 'Ultimate Frizbee In Clairmount Field',
    icon: 'av-timer'
  },
  {
    title: 'Swim Team Meet',
    icon: 'flight-takeoff'
  },
];

//FBFunctions.getData()

<<<<<<< Updated upstream



export default class HomeScreen extends Component{
=======
  constructor(props) {
      super(props);
      this.state = {photo: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg', };
      this.getPhotoUrl();
    //this.getUserInfo()
    //this.getGames()
  }
>>>>>>> Stashed changes

  state = {
    refresh : Date(Date.now()).toString(),
    showEventsUserIn : true,
    showEventsNearUser : true,
    showEventsFriendsIn : true,
    refreshing : false
  };

  onRefresh(){
    
    FBFunctions.getData()
    this.setState({ showEvents : true});
    //this.setState({refreshing : false});
  }
  
  render(){
<<<<<<< Updated upstream
  return(
=======
    const photo = this.state.photo
    static navigationOptions = {
      drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
        )
    }
  return( 
>>>>>>> Stashed changes

    <SafeAreaView style = {{flex: 1}}>
        <Header
      containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
      statusBarProps={{ barStyle: 'light-content' }}
<<<<<<< Updated upstream
      leftComponent={{ icon: 'menu', color: '#fff' }}
<<<<<<< Updated upstream
=======
      leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
>>>>>>> Stashed changes
      centerComponent={{ text: 'Home', style: { color: '#fff' , fontSize: 20} }}
      rightComponent={{ icon: 'home', color: '#fff' }}
=======
      centerComponent={{ text: 'Kick-Up', style: { color: '#fff' , fontSize: 20} }}
      rightComponent={
        <Avatar
        onPress={() => {
          console.log("touched registered")
          this.props.navigation.navigate('NewProfilePage')
        }}
  rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }}
/>
      }
>>>>>>> Stashed changes
    />
    <ScrollView style = {styles.ScrollView}
    refreshControl={
      <RefreshControl refreshing={this.state.refreshing}
        onRefresh={() =>
          this.onRefresh()
        }
    />}>
      <View style = {{flex : 1}}>

    <Card title="Events You're Participating In"
    onPress={() => {
      //FBFunctions.getData() 
      this.setState({showEventsUserIn  : !this.state.showEventsUserIn })
    }}>
    { this.state.showEventsUserIn &&
      FBFunctions.getData().map((item, i) => (
        <ListItem
          key={i}
          title={item.gameName}
          leftIcon={{ name: 'flight-takeoff' }}
          bottomDivider
          chevron
        />
      ))
    }
    <Button
					  title="Expand/Collapse"
					  type="clear"
					  onPress={() => {
						  this.setState({showEventsUserIn  : !this.state.showEventsUserIn })
					  }}
					  />
    </Card>

    <Card title="Events Your Friends Are Participating In">
    { this.state.showEventsFriendsIn &&
      list.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          leftIcon={{ name: item.icon }}
          bottomDivider
          chevron
        />
      ))
    }
    <Button
					  title="Expand/Collapse"
					  type="clear"
					  onPress={() => {
						  this.setState({showEventsFriendsIn  : !this.state.showEventsFriendsIn })
					  }}
					  />
    </Card>

    <Card title="Events Happening In your Area">
    { this.state.showEventsNearUser &&
      list.map((item, i) => (
        <TouchableHighlight
          onPress={() => {
            this.setState({showEventsNearUser : !this.state.showEventsNearUser})
          }}>
        <ListItem
          key={i}
          title={item.title}
          leftIcon={{ name: item.icon }}
          bottomDivider
          chevron
        />
        </TouchableHighlight>
      ))
    }
    <Button
					  title="Expand/Collapse"
					  type="clear"
					  onPress={() => {
						  this.setState({showEventsNearUser : !this.state.showEventsNearUser})
					  }}
					  />
    </Card>
    </View>
    </ScrollView>
    </SafeAreaView>


  )
  };
  //return (
    /*
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Change code in the editor and watch it change on your phone!
            Save to get a shareable url. You get a new url each time you save.
        </Text>
      </View>

        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Get started by opening</Text>

          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change this text and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
              WHat am i actually doing?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View>
    </View>
    */
  //);
}

HomeScreen.navigationOptions = {
  header: null,
};

function DBTest(){
  /*
  FBFunctions.storeData({
    sport: "Soccer",
    participants: "5-10",
    name: "Soccer game at the quad",
    date: new Date(),
    location: "Clairmount field",
    description: "come have fun"
  });
  */
  FBFunctions.getData();
}

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

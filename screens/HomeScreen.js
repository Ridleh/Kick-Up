import * as WebBrowser from 'expo-web-browser';
import {FBFunctions} from '../API/Firebase';
import { firebaseConfig } from '../config';
import * as firebase from 'firebase';
import { createStackNavigator, 
  createBottomTabNavigator, 
  createDrawerNavigator, 
  DrawerActions } from 'react-navigation';

import React, { Component } from 'react';
import {
  Image,
  Button,
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
  Alert,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Constants from 'expo-constants';
import { Avatar, Header, ListItem, Card, Icon, ButtonGroup } from 'react-native-elements';
import { fetchUpdateAsync } from 'expo/build/Updates/Updates';
//import { watchFile } from 'fs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { SSL_OP_EPHEMERAL_RSA } from 'constants';




export default class HomeScreen extends Component{
 
    constructor(props){
        super(props)
        this.state = {
            refresh : Date(Date.now()).toString(),
            test : true,
            showEventsUserIn : true,
            showEventsNearUser : true,
            showEventsFriendsIn : true,
            refreshing : false,
            photoUrl: '',
            games : [],
            selectedIndex: 0,
            photo: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg'
          };
      //this.getPhotoUrl();
      //this.setState({games : FBFunctions.getData()})
      console.log('constuctor')
    }

  static navigationOptions = {
          drawerIcon: () => 
              <Ionicons name="md-home" style={{fontSize: 24}} />
      }



  

  userID = " "
  allGames = []
  participatingGames = []
  friendsGames = []

  async componentDidMount() {
    var events = []
    var profilepic = '' 
    AsyncStorage.getItem('photoUrl', (err, result) => {
      profilepic = JSON.parse(result)
    })
    console.log('componentDidMount')
    firebase.database().ref("/Events/").once("value").then((snap) => {
      snap.forEach(function(childSnapshot){
        events.push(childSnapshot.val())
      })
      console.log(events.length)
      this.setState({
        games : events,
        photo : profilepic
      })
    })
  }

  componentWillUnmount() {
  }



  async getGames(){
    this.participatingGames = []
    this.allGames = await FBFunctions.getData().reverse()
    this.userID = JSON.parse( await AsyncStorage.getItem("userID"));
    for(game of this.allGames){
      for(player of game.players){
        if(player.ID === this.userID){
          //console.log(game)
          if(this.participatingGames.indexOf(game) == -1){
            console.log("added")
            this.participatingGames.push(game)
          }
        }
      } 
    }
    this.participatingGames.reverse()
    this.setState({
        games : this.allGames
    })
    console.log(this.state.games.length)
    console.log(this.participatingGames.length)
    //await this.sleep(5000)
  }


  sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
 
  getPhotoUrl = async () => {
    try {
        const photoUrl = await AsyncStorage.getItem('photoUrl');
        const photo = JSON.parse(photoUrl)
        this.setState({photo: photo});
    }
    catch (error) {
        // Manage error handling
    }
  } 

  onRefresh(){
    
    //FBFunctions.getData()
    this.getPhotoUrl();
    this.getGames();
    this.setState({refreshing : false});


    //this.setState({refreshing : false});
  }

  updateIndex(selectedIndex){
    if(selectedIndex === 0){
      this.setState({
        selectedIndex,
        games : this.allGames
      })
    }
    else if(selectedIndex === 1){
      this.setState({
        selectedIndex,
        games : this.participatingGames
      })
    }
    else{
      this.setState({
        selectedIndex,
        games : 'undefined'
      })
    }

    //this.setState({selectedIndex})
  }

  component1 = () => <Text>All Games</Text>
  component2 = () => <Text>My Games</Text>
  component3 = () => <Text>Loading Screen</Text>
  
  render(){
      this.sleep(4000)
    const photo = this.state.photo
    const buttons = [{ element: this.component1 }, { element: this.component2 }, { element: this.component3 }]
  return( 
    
    <SafeAreaView style = {{flex: 1}}>
    <React.Fragment>
        <Header
      containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
      statusBarProps={{ barStyle: 'light-content' }}
      leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
      centerComponent={{ text: 'Home', style: { color: '#fff' , fontSize: 20} }}
      rightComponent={
        <Avatar
        // onPress={() => {
        //   console.log("touched registered")
        //   this.props.navigation.navigate('Profile')
        // }}
  rounded
  source={{ 
    uri: photo
  }}
/>
      }
    />
    <ButtonGroup
      onPress={(index) => this.updateIndex(index)}
      selectedIndex = {this.state.selectedIndex}
      buttons={buttons}
      />
    {
      this.state.games === 'undefined' &&
      <View style={{
        flex: 1,
        justifyContent : "center",
        flexDirection : 'row',
        justifyContent : 'space-around',
        padding : 10
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    }
    {this.state.games !== 'undefined' &&
    <ScrollView style = {styles.ScrollView}
    refreshControl={
      <RefreshControl refreshing={this.state.refreshing}
        onRefresh={() =>
          this.onRefresh()
        }
    />}>
      <View style = {{flex:1}}>

      { 
        this.state.games.map((item, i) => (
        <TouchableHighlight
          onPress={() => {
            //console.log(this.getPhotoUrl())
            this.props.navigation.navigate('JoinGame', {gameName: item})
          }}>
        <ListItem

          key={i}
          title={item.gameName}
          
          subtitle=
            {
              item.sport + "\n" + item.date + "\n" + item.players.length + "/" + ((item.participants+1)*5) + " players"
            }

          leftIcon={<Ionicons 
                        name= {item.icon}
                        size={30}
                        />} 

          bottomDivider
          chevron
        />
        </TouchableHighlight>
        ))
    }
    </View>
    </ScrollView>   
  }
     </React.Fragment>
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
  icon: {
    width: 24,
    height: 24,
  },
});

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  AsyncStorage
} from 'react-native';

import { WebView } from 'react-native-webview';
import { Input, Header, ListItem, Card, Button, Icon } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';

import {DrawerActions } from 'react-navigation';


export default class Profile extends Component{

  constructor(props) {
      super(props);
      this.state = {userName: null, 
                    id: null, 
                    photo: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg',
                    email : null,
                    loggedIn: true};
      this.getUserName();
      this.getPhotoUrl();
      this.getEmail();
      this.getID();
  }

  signInWithGoogleAsync = async () => {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: '797555509018-n2h1evduuojhg3dfqh1cmeb93477a1v4.apps.googleusercontent.com',
        iosClientId: '797555509018-9dbto9calqd26cq8g8o4jg0p01jc7i1s.apps.googleusercontent.com ',
        scopes: ['profile', 'email'],
      });
      console.log(result);
      if (result.type === "success") {
        this.setState({loggedIn : true});
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
  }

  async changeStateVar(status){
    //prop bad idea but im tired
    await AsyncStorage.clear();
    //this.props.navigation.navigate("Login")
    this.props.navigation.navigate('Auth')
   //this.setState({loggedIn : status});
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
  getEmail = async () => {
    try {
        const email = await AsyncStorage.getItem('email');
        this.setState({email: email});
        console.log(email)
    }
    catch (error) {
        // Manage error handling
    }
}

  getUserName = async () => {
    try {
        const userName = await AsyncStorage.getItem('userName');
        this.setState({userName: userName});
    }
    catch (error) {
        // Manage error handling
    }
  }

  getID = async () => {
    try {
        const id = await AsyncStorage.getItem('id');
        this.setState({id: id});
    }
    catch (error) {
        // Manage error handling
    }
  }
  //state = {
  //  loggedIn : true
  //};

	render(){
    const username = JSON.parse(this.state.userName)
    const photo = this.state.photo
    const user_email = JSON.parse(this.state.email)
    const user_id = JSON.parse(this.state.id)
    console.log(user_id)
		return(
      <SafeAreaView>
			<View style={styles.container}>
      <Header
      containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
      statusBarProps={{ barStyle: 'light-content' }}
      leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
      centerComponent={{ text: 'Profile', style: { color: '#fff' , fontSize: 20} }}
    />
		        <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: photo}} />
		        <View style={styles.body}>
              {this.state.loggedIn &&
		            <View style={styles.bodyContent}>
		              <Text style={styles.name}> {username} </Text>
                  <Text style={styles.info}>ID: {user_id}</Text>
		              <Text style={styles.description}> {user_email} </Text>
		              
                  <TouchableOpacity
                    onPress={() => this.changeStateVar(false)} 
                    style={styles.buttonContainer}>
		                <Text>Sign Out</Text>  
		              </TouchableOpacity>              
		            </View> } 
		        </View>
            {!this.state.loggedIn &&
              <View>
                <TextInput
          placeholder={'Username'}
          style={styles.logInInput}
        />
        <TextInput
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.logInInput}
        />
        <TouchableOpacity style={styles.buttonContainer}
        onPress={() => this.changeStateVar(true)}>
		    <Text>Log In</Text> 
		    </TouchableOpacity>
		
              
                  <Button
                  onPress={() => this.signInWithGoogleAsync()}
                  title={'or sign in with Google'} 
                  style={styles.btntext}/>
               
              </View>
            }
	      	</View>
          </SafeAreaView>
		);
	}

}



Profile.navigationOptions = {
  header: null
}

function changeStateVar(status){
  console.log('called??');
  changeStateOnLogIn(status);
}

function SignInView(){
  return(
    <View>
		
    	<TouchableOpacity 
      		style = {styles.button}
      		onPress={() => this.signInWithGoogleAsync()}
      	>
      		<Text style={styles.btntext}>Join</Text>
      	</TouchableOpacity>
      </View>
  );
}



const styles = StyleSheet.create({
  header:{
    backgroundColor: "#4caf50",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:0,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:20,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:60,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    borderWidth:1,
    borderColor: '#000',
    backgroundColor: "#fff",
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  logInInput: {
    height: 40,
		borderWidth: 1,
		borderColor: 'black',
		paddingLeft: 20,
		margin: 10,
		borderRadius: 20,
		//underlineColorAndroid: 'transparent'
  }
});

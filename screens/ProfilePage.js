import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput
} from 'react-native';

import { Input, Header, ListItem, Card, Button, Icon } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';



export default class Profile extends Component{

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

  changeStateVar(status){
    this.setState({loggedIn : status});
  }

  state = {
    loggedIn : false
  };

	render(){
		return(
      <SafeAreaView>
			<View style={styles.container}>
      <Header
      containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
      statusBarProps={{ barStyle: 'light-content' }}
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Profile', style: { color: '#fff' , fontSize: 20} }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />
		        <View style={styles.header}></View>
            <Image
            style={styles.avatar} source={{uri: this.state.loggedIn == true ? 'https://bootdey.com/img/Content/avatar/avatar6.png' : 'https://i0.wp.com/bsnl.ch/wp-content/uploads/2019/03/avatar-default-circle.png'}}/>
		        <View style={styles.body}>
              {this.state.loggedIn &&
		            <View style={styles.bodyContent}>
		              <Text style={styles.name}>John Doe</Text>
		              <Text style={styles.info}>UX Designer / Mobile developer</Text>
		              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
		              
                  <TouchableOpacity
                    onPress={() => this.changeStateVar(false)} 
                    style={styles.buttonContainer}>
		                <Text>Sign Out</Text>  
		              </TouchableOpacity>              
		              <TouchableOpacity style={styles.buttonContainer}>
		                <Text>Opcion 2</Text> 
		              </TouchableOpacity>
		            </View>
                }
                
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
  console.log('called');
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
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
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
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
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
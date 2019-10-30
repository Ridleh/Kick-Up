import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Button, Divider } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as Google from 'expo-google-app-auth';


const appId = "1047121222092614"



export default class LoginScreen extends Component {
	signInWithGoogleAsync = async () => {
	  try {
	    const result = await Google.logInAsync({
	      behavior: 'web',
	      androidClientId: '797555509018-n2h1evduuojhg3dfqh1cmeb93477a1v4.apps.googleusercontent.com',
	      iosClientId: '797555509018-9dbto9calqd26cq8g8o4jg0p01jc7i1s.apps.googleusercontent.com ',
	      scopes: ['profile', 'email'],
	    });

	    if (result.type === 'success') {
	      return result.accessToken;
	    } else {
	      return { cancelled: true };
	    }
	  } catch (e) {
	    return { error: true };
	  }
	}

	async Login (){

	}

	async Signup(){

	}

	async onFbLoginPress() {

		const { type, token, expires, permissions, declinedPermissions } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
		  permissions: ['public_profile'],
		});
		if (type === 'success') {
		  const response = await fetch(
		          `https://graph.facebook.com/me?access_token=${token}`);
	      Alert.alert(
		    'Logged in!',
	        `Hi ${(await response.json()).name}!`,
	      );
	    } 
		
  	}

  render() {
    return (
      <View style={styles.joinform}>
      	<Text style={styles.header}> Login </Text>

 
      
      	<TouchableOpacity 
      		style = {styles.button}
      		onPress={() => this.Login()}
      	>
      		<Text style={styles.btntext}>Log in</Text>
      	</TouchableOpacity>

      	<TouchableOpacity 
      		style = {styles.button}
      		onPress={() => this.Signup()}
      	>
      		<Text style={styles.btntext}>Sign up</Text>
      	</TouchableOpacity>

      	<TouchableOpacity 
      		style = {styles.button}
      		onPress={() => this.signInWithGoogleAsync()}
      	>
      		<View style={ styles.storyCounters }>
    			<SocialIcon type = 'google' style={styles.iconCounter} />
    			<Text style={styles.iconCounterText}></Text>
			</View>
      	</TouchableOpacity>
      	<TouchableOpacity 
      		style = {styles.button}
      		onPress={() => this.onFbLoginPress()}
      	>
      		<View style={ styles.storyCounters }>
    			<SocialIcon type = 'facebook' style={styles.iconCounter} />
    			<Text style={styles.iconCounterText}></Text>
			</View>
      	</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	joinform: {
		alignSelf: 'stretch',
	},
	header: {
		fontSize: 36,
		alignSelf:'center',
		fontWeight: 'bold',
		color: '#000000',
		paddingBottom: 10,
		marginBottom: 40,
		borderBottomColor: '#199187',
		borderBottomWidth: 1,
	},
	text: {
		//alightSelf: 'stretch',
		alignSelf:'center',
		height: 40,
		marginBottom: 30,
		color: '#000000',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1,
	},
	text_important: {
		fontSize: 18,
		fontWeight: 'bold',
		//alightSelf: 'stretch',
		alignSelf:'center',
		height: 40,
		marginBottom: 30,
		color: '#000000',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1,
	},
	text_title: {
		fontSize: 24,
		fontWeight: 'bold',
		//alightSelf: 'stretch',
		alignSelf:'center',
		height: 40,
		marginBottom: 30,
		color: '#000000',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1,
	},
	button: {
		//alightSelf:'stretch',
		alignItems:'center',
		padding:20,
		backgroundColor:'#59cbbd',
		marginTop:30,
		bottom: 0

	},
	btntext: {
		fontSize: 24,
		alignSelf:'center',
		color: '#000000',
	},
	placeholderStyle: {
        fontSize: 14,
        color: '#000',
    },
    storyCounters: {
	  width: 25,
	  alignSelf:'center',
	},

	iconCounter: {
	  fontSize: 21,
	  color: '#bbbbbb',
	  alignSelf:'center',
	},

	iconCounterText: {
	  color: '#bbbbbb',
	  fontSize: 12,
	  textAlign: 'center'
	},
	

});

//<Text style={styles.btntext}>Join by</Text>
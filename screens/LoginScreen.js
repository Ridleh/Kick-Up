import React, { Component } from 'react';
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends Component {
	signInWithGoogleAsync = async () => {
	  try {
	    const result = await Google.logInAsync({
	      //androidClientId: YOUR_CLIENT_ID_HERE,
	      behavior: 'web',
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

  render() {
    return (
      <View style={styles.joinform}>
      	<Text style={styles.header}> Login </Text>

      	<TouchableOpacity 
      		style = {styles.button}
      		onPress={() => this.signInWithGoogleAsync()}
      	>
      		<Text style={styles.btntext}>Join</Text>
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
});
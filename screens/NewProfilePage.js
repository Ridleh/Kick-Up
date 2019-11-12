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


export default class NewProfilePage extends Component {
	signOut = async () => {
		firebase.auth().signOut()
		this.props.navigation.navigate('Login')
  	}
	render() {
	    return (
	      	<View style={styles.joinform}>
	      		<Text style={styles.header}> Profile Page </Text>
	      		<TouchableOpacity 
	      			style = {styles.button}
	      			onPress={() => this.signOut()}
	      		>
	      			<Text style={styles.btntext}>Sign out</Text>
	      		</TouchableOpacity>
	      	</View>
	    );
	  }
}
const styles = StyleSheet.create({ 
  joinform: {
    alignSelf: 'center',

  },
  header: {
    fontSize: 36,
    alignSelf:'center',
    fontWeight: 'bold',
    color: '#000000',
    paddingBottom: 10,
    marginBottom: 50,
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
    backgroundColor:'#4caf50',
    marginTop:20,
  },
  btntext: {
    fontSize: 24,
    alignSelf:'center',
    color: '#fff',
  },
  placeholderStyle: {
        fontSize: 10,
        color: '#000',
    },
    image: {
      flex: 1,
      alignItems: 'center',
      height: 200,
      width: 400,

      marginTop: 50, 

    }
});

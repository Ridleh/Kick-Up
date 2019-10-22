import React, { Component } from 'react';
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';

export default class JoinGame extends Component {
  render() {
    return (
      <View style={styles.joinform}>
      	<Text style={styles.header}> Join a Game </Text>
      	<Text style={styles.text_title}> Quick pickup anyone?</Text>
      	<Text style={styles.text_important}> 10/23/2019, 4:00pm </Text>
      	<Text style={styles.text}> Created by: Ronald Dough </Text>
      	<Text style={styles.text}> Description: Join if you are good. </Text>
      	<Text style={styles.text}> Location: Socker Field </Text>
      	<Text style={styles.text}> Number of Players: 3/16 </Text>

      	<TouchableOpacity style = {styles.button}>
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
		alightSelf: 'stretch',
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
		alightSelf: 'stretch',
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
		alightSelf: 'stretch',
		alignSelf:'center',
		height: 40,
		marginBottom: 30,
		color: '#000000',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1,
	},
	button: {
		alightSelf:'stretch',
		aignItems:'center',
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
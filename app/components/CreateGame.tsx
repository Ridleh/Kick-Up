import React, { Component } from 'react';
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';

export default class CreateGame extends Component {
  render() {
    return (
      <View style={styles.gameform}>
      	<Text style={styles.header}> Create a Game </Text>

      	<TextInput 
      		style = {styles.textinput} 
      		placeholder="Game Name"
      		placeholderTextColor={'#bfbfbf'}
            placeholderStyle={styles.placeholderStyle}
      		underlineColorAndroid='transparent'
      	/>
      	<TextInput 
      		style = {styles.textinput} 
      		placeholder="Date"
      		placeholderTextColor={'#bfbfbf'}
            placeholderStyle={styles.placeholderStyle}
      		underlineColorAndroid='transparent'
      	/>
		<TextInput 
      		style = {styles.textinput} 
      		placeholder="Location"
      		placeholderTextColor={'#bfbfbf'}
            placeholderStyle={styles.placeholderStyle}
      		underlineColorAndroid='transparent'
      	/>
      	<TextInput 
      		style = {styles.textinput} 
      		placeholder="Number of Players"
      		placeholderTextColor={'#bfbfbf'}
            placeholderStyle={styles.placeholderStyle}
      		underlineColorAndroid='transparent'
      	/>
      	<TextInput 
      		style = {styles.textinput} 
      		placeholder="Description"
      		placeholderTextColor={'#bfbfbf'}
            placeholderStyle={styles.placeholderStyle}
      		underlineColorAndroid='transparent'
      	/>


      	<TouchableOpacity style = {styles.button}>
      		<Text style={styles.btntext}>Submit</Text>
      	</TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
	gameform: {
		alignSelf: 'stretch',
	},
	header: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#000000',
		paddingBottom: 10,
		marginBottom: 40,
		borderBottomColor: '#199187',
		borderBottomWidth: 1,
	},
	textinput: {
		alightSelf: 'stretch',
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
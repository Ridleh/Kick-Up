import React, { Component } from 'react';
import { KeyboardAvoidingView, Alert, Dimensions, Picker, StyleSheet, View, Text,TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, TouchableHighlight, Modal, Input, Button, Overlay, Card, Divider } from 'react-native-elements';

let devicewWidth = Dimensions.get('window').width;



export default function CreateGame(){
		return (
			
			<SafeAreaView>
				<KeyboardAvoidingView keyboardVerticalOffset = {Header.HEIGHT + 20}>
			<View style={styles.viewContainer}>
				<Header
					containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
					statusBarProps={{ barStyle: 'light-content' }}
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: 'Create A Game', style: { color: '#fff' , fontSize: 20} }}
					rightComponent={{ icon: 'home', color: '#fff' }}	
    			/>
				<Card title={"Please complete this form"}
					style = {{width:devicewWidth}}>
						
					<Picker
						prompt = {'Select Sport'}
						style={styles.textInput}
						selectedValue={this.state.language}
						//style={{height: 50, width: 100}}
						onValueChange={(itemValue, itemIndex) =>
							//setStateVars({language: itemValue})
							Alert.alert("Value would be changed")
						}>
						<Picker.Item label="Soccer" value="java" />
						<Picker.Item label="Football" value="js" />
						<Picker.Item label="Frisbee" value="js" />
						<Picker.Item label="Golf" value="js" />
						<Picker.Item label="Other" value="js" />
						
					</Picker>
					<Divider/>

					<TextInput 
						style = {styles.textInput} 
						placeholder="Game Name"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
					/>
					<Divider/>
					<TextInput 
						style = {styles.textInput} 
						placeholder="Date"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
					/>
					<Divider/>
					<TextInput 
						style = {styles.textInput} 
						placeholder="Location"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
					/>
					<Divider/>
					<TextInput 
						style = {styles.textInput} 
						placeholder="Number of Players"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
					/>
					<Divider/>
					<TextInput 
						style = {styles.textInput} 
						placeholder="Description"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
					/>
					<Divider/>
      				<TouchableOpacity style = {styles.button}>
      					<Text style={styles.btntext}>Submit</Text>
      				</TouchableOpacity>

					


				</Card>

	  		</View>
			  </KeyboardAvoidingView>
			  </SafeAreaView>
			 

    	);
}

	CreateGame.navigationOptions = {
		header: null
	};

	state = {
		language : ""
	};


const styles = StyleSheet.create({
	viewContainer: {
		//width: '90%'
	  },
	  textInput: {
		height: 40,
		borderWidth: 1,
		borderColor: 'black',
		paddingLeft: 20,
		margin: 10,
		borderRadius: 20,
		//underlineColorAndroid: 'transparent'
	  },
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
		alignSelf: 'stretch',
		//height: 40,
		marginBottom: 30,
		color: '#000000',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1,
	},
	button: {
		alignSelf:'stretch',
		alignItems:'center',
		padding:20,
		backgroundColor:'#4caf50',
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
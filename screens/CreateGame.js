import React, { Component } from 'react';
import { KeyboardAvoidingView, Alert, Dimensions, Picker, StyleSheet, View, Text,TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, TouchableHighlight, Modal, Input, Button, Overlay, Card, Divider } from 'react-native-elements';
import { tsConstructorType } from '@babel/types';
import {FBFunctions} from '../API/Firebase';

let devicewWidth = Dimensions.get('window').width;



export default class CreateGame extends Component{

	printEvent(){
		console.log(this.state.sport + '\n'
			+ this.state.participants + '\n'
			+ this.state.gameName + '\n'
			+ this.state.date + '\n'
			+ this.state.location + '\n'
			+ this.state.description + '\n')
	}

	async submitEvent(){
		var event = {
			sport: this.state.sport,
			participants: + this.state.participants,
			gameName : this.state.gameName,
			date:  this.state.date,
			location : this.state.location,
			description : this.state.description,
		}
		if( JSON.parse( JSON.stringify(event)) ){
			FBFunctions.storeData(event)	
		}
		else{
			console.log(" : ( ");
		}
		//FBFunctions.storeData(event)
		//console.log("done")
	}

	state = {
		sport : "Select a sport",
		participants: "Select number of participants",
		showOtherInput: false,
		showConfirmationScreen: false,
		gameName: "blank",
		date: "blank",
		location: "blank",
		description: "blank"
	};

		render(){
		return (
			
			<SafeAreaView style={{flex:1}}>
				<KeyboardAvoidingView keyboardVerticalOffset = {Header.HEIGHT + 20}
				>
			<View style={styles.viewContainer}>
				<Header
					containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
					statusBarProps={{ barStyle: 'light-content' }}
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: 'Create A Game', style: { color: '#fff' , fontSize: 20} }}
					rightComponent={{ icon: 'home', color: '#fff' }}	
    			/>
				<ScrollView>
				<Card title={"Please complete this form"}
					style = {{width:devicewWidth}}>

						<Picker
						prompt = {'Select Sport'}
						style={styles.textInput}
						selectedValue={this.state && this.state.sport || 'default'}
						onValueChange={(value) => {
							this.setState({sport : value})
						}}
						//style={{height: 50, width: 100}}
						>
							
						<Picker.Item label="Select a sport" value="default" />
						<Picker.Item label="Soccer" value="Soccer" />
						<Picker.Item label="Football" value="Football" />
						<Picker.Item label="Frisbee" value="Frisbee" />
						<Picker.Item label="Golf" value="Golf" />
						<Picker.Item label="Other" value="Other" />
						
						</Picker>
						{this.state.sport == "Other" &&
							<TextInput 
							style = {styles.textInput} 
							placeholder="Enter custom sport"
							placeholderTextColor={'#bfbfbf'}
							placeholderStyle={styles.placeholderStyle}
							underlineColorAndroid='transparent'
						/>
						}
						<Divider/>
						
					<Picker
						prompt = {'Select number of participants'}
						style={styles.textInput}
						selectedValue={this.state && this.state.participants || 'default'}
						onValueChange={(value) => {
							this.setState({participants : value})
						}}
						//style={{height: 50, width: 100}}
						>
						<Picker.Item label="Select number of players" value="default" />
						<Picker.Item label="0-5" value="0" />
						<Picker.Item label="5-10" value="1" />
						<Picker.Item label="10-15" value="2" />
						<Picker.Item label="15-20" value="3" />
						<Picker.Item label="20+" value="4" />
						
					</Picker>
					<Divider/>

					<TextInput 
						style = {styles.textInput} 
						placeholder="Game Name"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
						onEndEditing={(text) => {
							this.setState({gameName : text.nativeEvent.text})
						}}
					/>
					<Divider/>
					<TextInput 
						style = {styles.textInput} 
						placeholder="Date"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
						onEndEditing={(text) => {
							this.setState({date : text.nativeEvent.text})
						}}
					/>
					<Divider/>
					<TextInput 
						style = {styles.textInput} 
						placeholder="Location"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
						onEndEditing={(text) => {
							this.setState({location : text.nativeEvent.text})
						}}
					/>
					<Divider/>
					<TextInput 
						style = {styles.textInput} 
						placeholder="Description"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
						multiline
						onEndEditing={(text) => {
							this.setState({description : text.nativeEvent.text})
						}}
					/>
					<Divider/>
      				<Button
					  title="Submit"
					  type="solid"
					  onPress={() => {
						  this.printEvent()
						  this.submitEvent()
					  }}
					  />
				</Card>
				</ScrollView>

	  		</View>
			  </KeyboardAvoidingView>
		
			  </SafeAreaView>
			 

    	)};
}

CreateGame.navigationOptions = {
	header: null
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
import React, { Component } from 'react';
import {FBFunctions} from '../API/Firebase'
import { AsyncStorage, SafeAreaView, StyleSheet, View, Text,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Card, ListItem } from 'react-native-elements';

export default class JoinGame extends Component {


	gameInfo = this.props.navigation.getParam("gameName");
	run = this.isUserInGame()
	state = {
		showJoinGameButton : true,
		date : this.gameInfo.date,
		description : this.gameInfo.description,
		name : this.gameInfo.gameName,
		location : this.gameInfo.location,
		participants : this.gameInfo.participants,
		sport : this.gameInfo.sport,
		players : this.gameInfo.players,
		ID : this.gameInfo.ID,
		playersList : [],
		userID: " ",
		userName: " "
	}

	async isUserInGame(){
		console.log(this.gameInfo)
		const localUserID = JSON.parse( await AsyncStorage.getItem("userID"));
		const localUserName = JSON.parse( await AsyncStorage.getItem("userName"));
		console.log(localUserID)
		var listOfPlayers = []
		for(player of this.gameInfo.players){
				listOfPlayers.push(player.name)
			if(player.ID === localUserID ){
				console.log("we got false")
				this.setState({showJoinGameButton : false})
			}
		}
		this.setState({playersList : listOfPlayers})
		this.setState({userID : localUserID})
		this.setState({userName : localUserName})
	}

	determinePlayerSize(){
		var currentNumPlayers = this.state.players.length;
		console.log("good")
		var participantValue = this.state.participants;
		console.log("also good")
		if(participantValue == 0){
			return currentNumPlayers + "/5"; 
		}
		else if(participantValue == 1){
			return currentNumPlayers + "/10"
		}
		else if(participantValue == 2){
			return currentNumPlayers + "/15"
		}
		else if(participantValue == 3){
			return currentNumPlayers + "/20"
		}
		else if(participantValue == 4){
			return currentNumPlayers + "/20+"
		}
	}

	async addPlayerToGame(){
		//console.log(this.gameInfo); 
		player = {name: this.state.userName, ID: this.state.userID};
		newPlayerList = this.state.players
		newPlayerList.push(player)
		this.setState({players : newPlayerList})
		//FBFunctions.storeData(this.state); 

		var event = {
			sport: this.state.sport,
			participants: + this.state.participants,
			gameName : this.state.name,
			date:  this.state.date,
			location : this.state.location,
			description : this.state.description,
			players : this.state.players,
			ID : this.state.ID
		}
		if( JSON.parse( JSON.stringify(event)) ){
			await FBFunctions.updateData(event)
			this.setState({showJoinGameButton : false})	
		}
		else{
			console.log(" : ( ");
		}
	}

  render() {
    return (
		<SafeAreaView style = {{flex: 1}}>
			<ScrollView style = {{flex: 1}}>
      <View style={styles.joinform}>
      	<Text style={styles.header}> Join {this.state.name} </Text>
      	<Text style={styles.text_title}> Quick pickup anyone?</Text>
      	<Text style={styles.text_important}> 10/23/2019, 4:00pm </Text>
      	<Text style={styles.text}> Created by: Ronald Dough </Text>
		<Text style={styles.text}> Description: {this.state.description}</Text>
      	<Text style={styles.text}> Location: {this.state.location} </Text>
      	<Text style={styles.text}> Number of Players: {this.determinePlayerSize()} </Text>
		  <Card title="Players In This Event">
      		{this.state.playersList.map((item, i) => (
        	<ListItem
          key={i}
          title={item}
          bottomDivider
          chevron
        />
			  
      ))}
    </Card>
		{ this.state.showJoinGameButton &&
		<TouchableOpacity 
      		style = {styles.button}
			  onPress={() => 
				this.addPlayerToGame()
			}
      	>
      		<Text style={styles.btntext}>Join Game</Text>
      	</TouchableOpacity>
  }
      </View>
	  </ScrollView>
	  </SafeAreaView>
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
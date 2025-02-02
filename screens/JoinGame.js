import React,{ Component } from 'react';
import {FBFunctions} from '../API/Firebase'
import MapView from 'react-native-maps';
import markerImage from "../assets/current_location.png";
import {DrawerActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
	Share, 
	AsyncStorage, 
	Alert, 
	SafeAreaView, 
	StyleSheet, 
	Dimensions, 
	View, 
	Text,
	TextInput, 
	TouchableOpacity, 
	ScrollView, 
	Button,
	Image,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';


import { RepositionButton } from '../components/RepositionButton2';

//import { Card, ListItem, Icon } from 'react-native-elements';
import {
  AdMobBanner
} from 'expo-ads-admob';
import { 
	Card, 
	ListItem, 
	Icon, 
	Overlay, 
	Divider,
	Header
} from 'react-native-elements';
//>>>>>>> 8e7e1957a02ba9f641301e05b75eed6c7e544a2f

const {width, height} = Dimensions.get('window')

export default class JoinGame extends Component {


	gameInfo = this.props.navigation.getParam("gameName");
	run = this.isUserInGame()
	state = {
		showJoinGameButton : true,
		showLeaveGameButton : false,
		date : this.gameInfo.date,
		description : this.gameInfo.description,
		name : this.gameInfo.gameName,
		location_lat : this.gameInfo.location_lat,
		location_long : this.gameInfo.location_long,
		location_name : this.gameInfo.location_name,
		location_address : this.gameInfo.location_address,
		participants : this.gameInfo.participants,
		sport : this.gameInfo.sport,
		players : this.gameInfo.players,
		ID : this.gameInfo.ID,
		icon : this.gameInfo.icon,
		chatID: this.gameInfo.chatID,
		playersList : [],
		createdBy: this.gameInfo.createdBy,
		createdByID: this.gameInfo.createdByID,
		userID: " ",
		userName: " ",
		showEditGameButton: false,
		showEditGameOverlay : false,
		totalPlayers : 0

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
				this.setState({showLeaveGameButton : true})
			}
		}
		if(localUserID === this.gameInfo.createdByID){
			this.setState({showEditGameButton : true})
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
			participants: this.state.participants,
			  gameName : this.state.name,
			  createdBy: this.state.createdBy,
			  date:  this.state.date,
			  icon : this.state.icon,
			  location_lat : this.state.location_lat,
			  location_long : this.state.location_long,
			  location_name : this.state.location_name,
			  location_address: this.state.location_address,
			  description : this.state.description, 
			  players: this.state.players,
			  ID : this.state.ID
		}
		if( JSON.parse( JSON.stringify(event)) ){
			await FBFunctions.updateData(event)
			this.setState({showJoinGameButton : false})	
			this.setState({showLeaveGameButton : true})
		}
		else{
			console.log(" : ( ");
		}
	}
	async removePlayerFromGame(){ 
		//console.log(this.gameInfo); 
		var event = {
			sport: this.state.sport,
			participants: this.state.participants,
			  gameName : this.state.name,
			  createdBy: this.state.createdBy,
			  date:  this.state.date,
			  icon : this.state.icon,
			  location_lat : this.state.location_lat,
			  location_long : this.state.location_long,
			  location_name : this.state.location_name,
			  location_address: this.state.location_address,
			  description : this.state.description, 
			  players: this.state.players,
			  ID : this.state.ID
		}
		if(this.state.players.length == 1){
			await FBFunctions.removeData(event)
			Alert.alert("Event Deleted",
					`The event has been deleted`,
					[
						{text: 'OK', onPress: () => this.props.navigation.navigate('Home')}
					]);
		} else {
			player = {name: this.state.userName, ID: this.state.userID};
			newPlayerList = this.state.players
			console.log("leaving game")
			for (var i = 0; i < newPlayerList.length; i++) {
				if (newPlayerList[i].ID == this.state.userID) {
					newPlayerList.splice(i, 1)
				}
			}
			console.log(newPlayerList)
			//newPlayerList.splice(player_removed, 1)
			this.setState({players : newPlayerList})
			//FBFunctions.storeData(this.state); 

			var event = {
				sport: this.state.sport,
				participants: this.state.participants,
      			gameName : this.state.name,
      			createdBy: this.state.createdBy,
				  date:  this.state.date,
				  icon: this.state.icon,
				location_lat : this.state.location_lat,
		  		location_long : this.state.location_long,
			  	location_name : this.state.location_name,
			  	location_address: this.state.location_address,
      			description : this.state.description, 
				  players: this.state.players,
				  ID : this.state.ID
			}
			if( JSON.parse( JSON.stringify(event)) ){
				await FBFunctions.updateData(event)
				this.setState({showJoinGameButton : true})	
				this.setState({showLeaveGameButton : false})
				Alert.alert("Event Left",
					`You have left the game`,
					[
						{text: 'OK', onPress: () => this.props.navigation.navigate('Home')}
					]);
			}
			else{
				console.log(" : ( ");
			}
		}
	}

	centerMap() {

      this.setState({
        region: {
          latitude: this.gameInfo.location_lat, 
          longitude: this.gameInfo.location_long,
          latitudeDelta: 0.01,
    	  longitudeDelta: (width / height)*0.01,
      	}});
  	}

	shareGame = async() =>{
		try{
			const result = await Share.share({
				message: `come join ${this.state.name} | ${this.state.description}`,
			});

			if(result.action === Share.sharedAction){
				if(result.activityType){
					console.log('success')
				}
				else{
					console.log('oh no')
				}
			}
		}
		catch(error){
			console.log('something went wrong: ' + error)
		}
	}

	handleChatNavigation(){
		chatData = {
			friendsName: 'Group Chat For ' + this.state.name,
			chatID: this.state.chatID,
		}
		this.props.navigation.navigate('chat', {friend : chatData})
	}

	showEditGameScreen(){
		this.setState({showEditGameOverlay : true})
	}

	updateGameInfo(){
		try{
			var event = {
				sport: this.state.sport,
				participants: this.state.participants,
      			gameName : this.state.name,
      			createdBy: this.state.createdBy,
				  date:  this.state.date,
				  icon: this.state.icon,
				location_lat : this.state.location_lat,
		  		location_long : this.state.location_long,
				location_name : this.state.location_name,
				location_address: this.state.location_address,
      			description : this.state.description, 
				  players: this.state.players,
				  ID : this.state.ID
			}
			FBFunctions.updateData(event)
			Alert.alert('Event has been successfully edited')
			this.setState({showEditGameOverlay : false})
		}
		catch(error){
			Alert.alert("Something went wrong:", error.message)
			console.log(error);
		}
	}

  render() {
    return (
    	//<ImageBackground source={} style={{width: '100%', height: '100%'}}>
		<SafeAreaView style = {{flex: 1}}>
			 <Header
          		containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
	          	statusBarProps={{ barStyle: 'light-content' }}
	          	leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
	          	centerComponent={{ text: 'Game Information', style: { color: '#fff' , fontSize: 20} }} />
			<ScrollView style = {{flex: 1}}>

		
  	
      <View style={styles.joinform}>
      		
		  	{this.state.showEditGameButton && 
		  		<Button
			  	title='edit game'
			  	onPress={() => this.showEditGameScreen()}
				/>
			}

			<Overlay
				isVisible ={this.state.showEditGameOverlay}
				onBackdropPress={() => this.setState({showEditGameOverlay : false})} 
			>
				<Card
				title='Edit Game'
				>
					

					<TextInput 
						style = {styles.textInput} 
						placeholder="Game Name"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
						multiline
						onEndEditing={(text) => {
							this.setState({name : text.nativeEvent.text})
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
					<TextInput 
						style = {styles.textInput} 
						placeholder="Location"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
						multiline
						onEndEditing={(text) => {
							this.setState({location_name : text.nativeEvent.text})
						}}
					/>
					<TextInput 
						style = {styles.textInput} 
						placeholder="Address"
						placeholderTextColor={'#bfbfbf'}
						placeholderStyle={styles.placeholderStyle}
						underlineColorAndroid='transparent'
						multiline
						onEndEditing={(text) => {
							this.setState({location_address : text.nativeEvent.text})
						}}
					/>
					<Divider/>
					<Button
						title='Save Changes'
						onPress={() => this.updateGameInfo()}
					/>
				</Card>
			</Overlay>
		<AdMobBanner
		  				bannerSize="fullBanner"
		  				adUnitID="ca-app-pub-4386529393896712/1309515346"
		  				testDeviceID="EMULATOR"
		  				servePersonalizedAds
		  				onDidFailToReceiveAdWithError={this.bannerError} />
      	<Text style={styles.heading}>{this.state.name} </Text>
      	<Text style={styles.text_important}> {this.state.date} </Text>
      	<Text style={styles.text}> Created by: {this.state.createdBy} </Text>
		<Text style={styles.text}> Description: {this.state.description}</Text>
      	<Text style={styles.text}> Location: {this.state.location_name} </Text>
      	<Text style={styles.text}> Address: {"\n"} {this.state.location_address} </Text>
      	<Text style={styles.text}> Number of Players: {this.determinePlayerSize()} </Text>
      	<MapView
          region={{
          	latitude: this.gameInfo.location_lat, 
          	longitude: this.gameInfo.location_long,
          	latitudeDelta: 0.01,
    		longitudeDelta: (width / height)*0.01,
          }}
          showUserLocation
          style={styles.mapStyle}>
          <MapView.Marker
            coordinate = {{
				latitude: this.gameInfo.location_lat, 
          		longitude: this.gameInfo.location_long,
            }}>
            <Image source={require('../assets/current_location.png')} style={{height: 35, width:35 }} />
            
            <View style = {styles.radius}>
              <View style = {styles.marker}>

              </View>

            </View>
          </MapView.Marker>
          

        </MapView>
        <RepositionButton cb = {() => { this.centerMap()}} />
		{ this.state.showLeaveGameButton &&
		<Button
			title='open group chat'
			onPress={() => this.handleChatNavigation()}
				/>
		}
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


      	{ this.state.showLeaveGameButton &&
		<TouchableOpacity 
      		style = {styles.button2}
			  onPress={() => 
				this.removePlayerFromGame()
			}
      	>
      		<Text style={styles.btntext}>Leave Game</Text>
      	</TouchableOpacity>
		}


  
		<Button
		title='share this game'
		onPress={() => this.shareGame()}>

		</Button>
      </View>
	  </ScrollView>
	  </SafeAreaView>
    );
  }
}

JoinGame.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
	joinform: {
		alignSelf: 'stretch',
		backgroundColor: '#fff',
	},
	header:{
    	backgroundColor: "#4caf50",
    	height:200,
  	},
	heading: {
		flex: 1,
		fontSize: 30,
		fontFamily: 'Roboto', //useless
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
		textAlign: 'center',
		height: 40,
		marginBottom: 20,
		color: '#000000',
		borderBottomColor: '#f8f8f8',
		borderBottomWidth: 1,
	},
	textInput: {
		height: 60,

		fontSize: 15,
		paddingLeft: 20,
		margin: 10,

		//underlineColorAndroid: 'transparent'
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
		color: '#4caf50',
		backgroundColor: '#4caf50',
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
	button2: {
		//alightSelf:'stretch',
		alignItems:'center',
		padding:20,
		backgroundColor:'#FF9597',
		marginTop:30,
	},
	btntext: {
		fontSize: 24,
		alignSelf:'center',
		color: '#000000',

	},
	placeholderStyle: {
        fontSize: 14,
        alignSelf:'center',
        color: '#000',
    },
    mapStyle: {
    	width: width - 50,
    	alignSelf: 'center',
    	height: 250,
    	padding:20,
    	marginTop:20,
    	marginBottom: 20,
  	},
});


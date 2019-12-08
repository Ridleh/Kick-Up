import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, Alert, Dimensions, Picker, StyleSheet, View, Text,TextInput, TouchableOpacity, SafeAreaView, ScrollView, Platform, StatusBar, DatePickerAndroid, TimePickerAndroid, DatePickerIOS } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, CheckBox, Icon, Header, TouchableHighlight, Modal, Input, Button, Overlay, Card, Divider } from 'react-native-elements';
import { tsConstructorType, tsBooleanKeyword } from '@babel/types';
import {FBFunctions} from '../API/Firebase';
import * as Calendar from 'expo-calendar'
import * as Permissions from 'expo-permissions'
import {DrawerActions } from 'react-navigation';


let devicewWidth = Dimensions.get('window').width;

export default class CreateGame extends Component{

	constructor(){
		super()
	}

	setDateAndroid = async () => {
		try {
		  const {
			action, year, month, day,
		  } = await DatePickerAndroid.open({
		  date: new Date(),
		  minDate: new Date(),
		  });
		  if (action !== DatePickerAndroid.dismissedAction) {
			  var dateTest = new Date(year,month,day)
			  console.log(dateTest)
			this.setState({androidDateFormatted: `${day}/${month + 1}/${year}` });
			this.setState({androidDate : dateTest})
		  }
		} catch ({ code, message }) {
		  console.warn('Cannot open date picker', message);
		}
	  }; 
	  
	  setTimeAndroid = async () => {
		try {
		  const { action, hour, minute } = await TimePickerAndroid.open({
			hour: 14,
			minute: 0,
			is24Hour: false, // Will display '2 PM'
		  });
		  if (action !== TimePickerAndroid.dismissedAction) {
			// Selected hour (0-23), minute (0-59)
			const m = (minute < 10) ? `0${minute}` : minute;
			const h = (hour < 10) ? `0${hour}` : hour;
			console.log(`time: ${hour}:${minute}`);
			this.setState({ chosenAndroidTime: `${h}:${m}` });
		  }
		} catch ({ code, message }) {
		  console.warn('Cannot open time picker', message);
		}
	  };

	  async createCalendarEvent(){
		  const calendarList = await Calendar.getCalendarsAsync();
		  //console.log(calendarList)
		  const {status, permissions}  = await Permissions.askAsync(Permissions.CALENDAR)
		  const details = {
			  title: this.state.gameName,
			  startDate: this.state.androidDate,
			  endDate: this.state.androidDate,
			  allDay: false,
			  location_lat : this.props.navigation.state.params.loc_lat,
			  location_long : this.props.navigation.state.params.loc_long,
			  location_name : this.props.navigation.state.params.loc_name,
			  location_address: this.props.navigation.state.params.loc_address,
			  timeZone: "GMT-5",
			  notes: this.state.description	  
		  }
		  try{
		  if(status === 'granted'){
			  calendarEventID = await Calendar.createEventAsync('9',details)
			  console.log(calendarEventID);
		  }
		  else{
			  console.log("permission not granted") 
		  }
		}
		catch(error){
			console.log("somethin went wrong: " + error)
		}
		this.setState({showOverlay : false})

	  }

	printEvent(){
		console.log(this.state.sport + '\n'
			+ this.state.participants + '\n'
			+ this.state.gameName + '\n'
			+ this.state.date + '\n'
			+ this.state.icon + '\n'
			+ this.props.navigation.state.params.loc_lat + '\n'
			+ this.props.navigation.state.params.loc_long + '\n'
			+ this.props.navigation.state.params.loc_name + '\n'
			+ this.props.navigation.state.params.loc_address + '\n'
			+ this.state.description + '\n')
	}

	//either this or import uuid library 
	createChatID(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		  });
	}

	getPhotoUrl(){
		try {
		  AsyncStorage.getItem('photoUrl').then((keyValue) => {
			return JSON.parse(keyValue);
		  });
		} catch (error) {
		  Alert.alert("Something went wrong: " + error)
		}
	  }

	async getUserName(){
		const value = await AsyncStorage.getItem("userName");
		//console.log(value);
		return JSON.parse(value);
	}

	async getUserID(){
		const value = await AsyncStorage.getItem("userID");
		//console.log(value)
		return JSON.parse(value)
	}


	async submitEvent(){
		var userID = await this.getUserID()
		var userName = await this.getUserName()
		var event = {
			sport: this.state.sport,
			participants: + this.state.participants,
			createdBy: userName,
			gameName : this.state.gameName,
			date:  this.state.androidDate.toUTCString(),
			dateFormatted: this.state.androidDateFormatted,
			icon : this.state.icon,
//<<<<<<< HEAD
			location_lat : this.props.navigation.state.params.loc_lat,
			location_long : this.props.navigation.state.params.loc_long,
			location_name : this.props.navigation.state.params.loc_name,
			location_address: this.props.navigation.state.params.loc_address,

//=======	
			//location: this.state.location,
			//location_lat : this.state.location_lat/*this.props.navigation.state.params.loc_lat*/,
			//location_long : this.state.location_long/*this.props.navigation.state.params.loc_long*/,
//>>>>>>> //8e7e1957a02ba9f641301e05b75eed6c7e544a2f
			description : this.state.description,
			players: [{name: userName, ID: userID }],
			createdByID: userID,
			ID: "null",
			chatID: this.createChatID()
			
		}
		try{
		if( JSON.parse( JSON.stringify(event)) ){
			await FBFunctions.storeData(event)	
		}
		else{
			throw new error("Cannot Stringify event");
		}
		if(this.state.createCalendarEventOnSubmit){
			await this.createCalendarEvent()
		}
		if (this.state.sport == "Football" ){
			this.state.icon = "md-american-football"
			console.log("kevinblah2");
		} else if (this.state.sport == "Frisbee") {
			this.state.icon = "disc"
		} else if (this.state.sport == "Basketball") {
			this.state.icon = "basketball"
		} else {
			this.state.icon = "help-circle"
			console.log("kevinblah");
		}
		this.printEvent();
		Alert.alert("Event Created",
					`The event ${this.state.gameName} has been successfully created`,
					[
						{text: 'OK', onPress: () => this.props.navigation.navigate('Home')}
					]);
	}
	catch(error){
		Alert.alert("Something went wrong:", error.message)
		console.log(error);
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
		//location : 'blank',
		location_lat: "blank",
		location_long: "blank",
		location_name: "blank",
		location_address: "blank",
		description: "blank",
		icon: "md-football",
		name: " ",
		ID: " ",
		showOverlay: false,
		chosenDate: new Date(),
		chosenAndroidTime: '00:00',
		androidDateFormatted: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
		androidDate: new Date(),
		value: 50,
		createCalendarEventOnSubmit: false
	};

		render(){
		return (
			
			<SafeAreaView style={{flex:1}}>
				<KeyboardAvoidingView keyboardVerticalOffset = {Header.HEIGHT + 20}
				>
			<View style={styles.viewContainer}>
				<Header
					containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
					leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
					statusBarProps={{ barStyle: 'light-content' }}
					centerComponent={{ text: 'Create A Game', style: { color: '#fff' , fontSize: 20} }}	
    			/>
				<ScrollView>
				<Card title={"Please complete this form"}
					style = {{width:devicewWidth}}>

						<Picker
						prompt = {'Select Sport'}
						//style={styles.textInput}
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
						<Picker.Item label="Basketball" value="Basketball" />
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
						//style={styles.textInput}
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
					<Button
					title="Tap to set Date"
					type="solid"
					onPress={() =>
						this.setState({showOverlay : true}) 
					}/>
					<Overlay
					onBackdropPress={() => this.setState({showOverlay : false})} 
					isVisible={this.state.showOverlay}>
						 {
          Platform.OS === 'ios' ? (
            <DatePickerIOS
              date={chosenDate}
              onDateChange={this.setDate}
            />
          ) : (
            <View>
				<Text>Tap To Set Date</Text>
              <TouchableOpacity onPress={() => this.setDateAndroid()}>
                <View>
                  <Icon name="calendar" type='font-awesome' size={25} color="rgb(49, 49, 49)" />
                  <Text style={{ fontSize: 16 }}>
                    {this.state.androidDateFormatted}
                  </Text>
                </View>
              </TouchableOpacity>
			  <Text>Tap To Set Time</Text>
              <TouchableOpacity onPress={() => this.setTimeAndroid()}>
                <View>
                  <Icon name="clock-o" type='font-awesome' size={25} color="rgb(49, 49, 49)" />
                  <Text style={{ fontSize: 16 }}>
                    {this.state.chosenAndroidTime}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }
						<Button
						title="Submit"
						type="solid" 
						width="auto"
						height="auto"
						
						onPress={() => 
		
							//this.createCalendarEvent()
							this.setState({showOverlay : false})
						}/>
					</Overlay>
					<Divider/>
					<Button
					  title="Location"
					  type="solid"
					  onPress={() => 
					  		this.props.navigation.navigate('Maps')

					  }
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
					<CheckBox
						onPress={() => 
						this.setState({createCalendarEventOnSubmit : !this.state.createCalendarEventOnSubmit})
						}
						center
						title='Create Calendar Event'
						iconRight
						iconType='material'
						checkedIcon='clear'
  						uncheckedIcon='add'
  						checkedColor='red'
						checked={this.state.createCalendarEventOnSubmit}
						/>
      				<Button
					  title="Submit"
					  type="solid"
					  onPress={() => {
						  //this.printEvent()
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




//["glass",
//"music",
//"search",
//"envelope-o","heart","star","star-o","user","film","th-large","th","th-list","check","remove","close","times","search-plus","search-minus","power-off","signal","gear","cog","trash-o","home","file-o","clock-o","road","download","arrow-circle-o-down","arrow-circle-o-up","inbox","play-circle-o","rotate-right","repeat","refresh","list-alt","lock","flag","headphones","volume-off","volume-down","volume-up","qrcode","barcode","tag","tags","book","bookmark","print","camera","font","bold","italic","text-height","text-width","align-left","align-center","align-right","align-justify","list","dedent","outdent","indent","video-camera","photo","image","picture-o","pencil","map-marker","adjust","tint","edit","pencil-square-o","share-square-o","check-square-o","arrows","step-backward","fast-backward","backward","play","pause","stop","forward","fast-forward","step-forward","eject","chevron-left","chevron-right","plus-circle","minus-circle","times-circle","check-circle","question-circle","info-circle","crosshairs","times-circle-o","check-circle-o","ban","arrow-left","arrow-right","arrow-up","arrow-down","mail-forward","share","expand","compress","plus","minus","asterisk","exclamation-circle","gift","leaf","fire","eye","eye-slash","warning","exclamation-triangle","plane","calendar","random","comment","magnet","chevron-up","chevron-down","retweet","shopping-cart","folder","folder-open","arrows-v","arrows-h","bar-chart-o","bar-chart","twitter-square","facebook-square","camera-retro","key","gears","cogs","comments","thumbs-o-up","thumbs-o-down","star-half","heart-o","sign-out","linkedin-square","thumb-tack","external-link","sign-in","trophy","github-square","upload","lemon-o","phone","square-o","bookmark-o","phone-square","twitter","facebook-f","facebook","github","unlock","credit-card","feed","rss","hdd-o","bullhorn","bell","certificate","hand-o-right","hand-o-left","hand-o-up","hand-o-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-circle-down","globe","wrench","tasks","filter","briefcase","arrows-alt","group","users","chain","link","cloud","flask","cut","scissors","copy","files-o","paperclip","save","floppy-o","square","navicon","reorder","bars","list-ul","list-ol","strikethrough","underline","table","magic","truck","pinterest","pinterest-square","google-plus-square","google-plus","money","caret-down","caret-up","caret-left","caret-right","columns","unsorted","sort","sort-down","sort-desc","sort-up","sort-asc","envelope","linkedin","rotate-left","undo","legal","gavel","dashboard","tachometer","comment-o","comments-o","flash","bolt","sitemap","umbrella","paste","clipboard","lightbulb-o","exchange","cloud-download","cloud-upload","user-md","stethoscope","suitcase","bell-o","coffee","cutlery","file-text-o","building-o","hospital-o","ambulance","medkit","fighter-jet","beer","h-square","plus-square","angle-double-left","angle-double-right","angle-double-up","angle-double-down","angle-left","angle-right","angle-up","angle-down","desktop","laptop","tablet","mobile-phone","mobile","circle-o","quote-left","quote-right","spinner","circle","mail-reply","reply","github-alt","folder-o","folder-open-o","smile-o","frown-o","meh-o","gamepad","keyboard-o","flag-o","flag-checkered","terminal","code","mail-reply-all","reply-all","star-half-empty","star-half-full","star-half-o","location-arrow","crop","code-fork","unlink","chain-broken","question","info","exclamation","superscript","subscript","eraser","puzzle-piece","microphone","microphone-slash","shield","calendar-o","fire-extinguisher","rocket","maxcdn","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-circle-down","html5","css3","anchor","unlock-alt","bullseye","ellipsis-h","ellipsis-v","rss-square","play-circle","ticket","minus-square","minus-square-o","level-up","level-down","check-square","pencil-square","external-link-square","share-square","compass","toggle-down","caret-square-o-down","toggle-up","caret-square-o-up","toggle-right","caret-square-o-right","euro","eur","gbp","dollar","usd","rupee","inr","cny","rmb","yen","jpy","ruble","rouble","rub","won","krw","bitcoin","btc","file","file-text","sort-alpha-asc","sort-alpha-desc","sort-amount-asc","sort-amount-desc","sort-numeric-asc","sort-numeric-desc","thumbs-up","thumbs-down","youtube-square","youtube","xing","xing-square","youtube-play","dropbox","stack-overflow","instagram","flickr","adn","bitbucket","bitbucket-square","tumblr","tumblr-square","long-arrow-down","long-arrow-up","long-arrow-left","long-arrow-right","apple","windows","android","linux","dribbble","skype","foursquare","trello","female","male","gittip","gratipay","sun-o","moon-o","archive","bug","vk","weibo","renren","pagelines","stack-exchange","arrow-circle-o-right","arrow-circle-o-left","toggle-left","caret-square-o-left","dot-circle-o","wheelchair","vimeo-square","turkish-lira","try","plus-square-o","space-shuttle","slack","envelope-square","wordpress","openid","institution","bank","university","mortar-board","graduation-cap","yahoo","google","reddit","reddit-square","stumbleupon-circle","stumbleupon","delicious","digg","pied-piper-pp","pied-piper-alt","drupal","joomla","language","fax","building","child","paw","spoon","cube","cubes","behance","behance-square","steam","steam-square","recycle","automobile","car","cab","taxi","tree","spotify","deviantart","soundcloud","database","file-pdf-o","file-word-o","file-excel-o","file-powerpoint-o","file-photo-o","file-picture-o","file-image-o","file-zip-o","file-archive-o","file-sound-o","file-audio-o","file-movie-o","file-video-o","file-code-o","vine","codepen","jsfiddle","life-bouy","life-buoy","life-saver","support","life-ring","circle-o-notch","ra","resistance","rebel","ge","empire","git-square","git","y-combinator-square","yc-square","hacker-news","tencent-weibo","qq","wechat","weixin","send","paper-plane","send-o","paper-plane-o","history","circle-thin","header","paragraph","sliders","share-alt","share-alt-square","bomb","soccer-ball-o","futbol-o","tty","binoculars","plug","slideshare","twitch","yelp","newspaper-o","wifi","calculator","paypal","google-wallet","cc-visa","cc-mastercard","cc-discover","cc-amex","cc-paypal","cc-stripe","bell-slash","bell-slash-o","trash","copyright","at","eyedropper","paint-brush","birthday-cake","area-chart","pie-chart","line-chart","lastfm","lastfm-square","toggle-off","toggle-on","bicycle","bus","ioxhost","angellist","cc","shekel","sheqel","ils","meanpath","buysellads","connectdevelop","dashcube","forumbee","leanpub","sellsy","shirtsinbulk","simplybuilt","skyatlas","cart-plus","cart-arrow-down","diamond","ship","user-secret","motorcycle","street-view","heartbeat","venus","mars","mercury","intersex","transgender","transgender-alt","venus-double","mars-double","venus-mars","mars-stroke","mars-stroke-v","mars-stroke-h","neuter","genderless","facebook-official","pinterest-p","whatsapp","server","user-plus","user-times","hotel","bed","viacoin","train","subway","medium","yc","y-combinator","optin-monster","opencart","expeditedssl","battery-4","battery","battery-full","battery-3","battery-three-quarters","battery-2","battery-half","battery-1","battery-quarter","battery-0","battery-empty","mouse-pointer","i-cursor","object-group","object-ungroup","sticky-note","sticky-note-o","cc-jcb","cc-diners-club","clone","balance-scale","hourglass-o","hourglass-1","hourglass-start","hourglass-2","hourglass-half","hourglass-3","hourglass-end","hourglass","hand-grab-o","hand-rock-o","hand-stop-o","hand-paper-o","hand-scissors-o","hand-lizard-o","hand-spock-o","hand-pointer-o","hand-peace-o","trademark","registered","creative-commons","gg","gg-circle","tripadvisor","odnoklassniki","odnoklassniki-square","get-pocket","wikipedia-w","safari","chrome","firefox","opera","internet-explorer","tv","television","contao","500px","amazon","calendar-plus-o","calendar-minus-o","calendar-times-o","calendar-check-o","industry","map-pin","map-signs","map-o","map","commenting","commenting-o","houzz","vimeo","black-tie","fonticons","reddit-alien","edge","credit-card-alt","codiepie","modx","fort-awesome","usb","product-hunt","mixcloud","scribd","pause-circle","pause-circle-o","stop-circle","stop-circle-o","shopping-bag","shopping-basket","hashtag","bluetooth","bluetooth-b","percent","gitlab","wpbeginner","wpforms","envira","universal-access","wheelchair-alt","question-circle-o","blind","audio-description","volume-control-phone","braille","assistive-listening-systems","asl-interpreting","american-sign-language-interpreting","deafness","hard-of-hearing","deaf","glide","glide-g","signing","sign-language","low-vision","viadeo","viadeo-square","snapchat","snapchat-ghost","snapchat-square","pied-piper","first-order","yoast","themeisle","google-plus-circle","google-plus-official","fa","font-awesome","handshake-o","envelope-open","envelope-open-o","linode","address-book","address-book-o","vcard","address-card","vcard-o","address-card-o","user-circle","user-circle-o","user-o","id-badge","drivers-license","id-card","drivers-license-o","id-card-o","quora","free-code-camp","telegram","thermometer-4","thermometer","thermometer-full","thermometer-3","thermometer-three-quarters","thermometer-2","thermometer-half","thermometer-1","thermometer-quarter","thermometer-0","thermometer-empty","shower","bathtub","s15","bath","podcast","window-maximize","window-minimize","window-restore","times-rectangle","window-close","times-rectangle-o","window-close-o","bandcamp","grav","etsy","imdb","ravelry","eercast","microchip","snowflake-o","superpowers","wpexplorer","meetup"].
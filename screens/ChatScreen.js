import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, AsyncStorage, View, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import {FBFunctions} from '../API/Firebase';
import {Header} from 'react-navigation'

export default class ChatScreen extends Component {


  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).friend.friendsName || 'Group Chat',
  });

  state = {
    messages: [],
    friend: this.props.navigation.state.params.friend,
    chatID: -1,
    userName : 'test',
    userID : 'test'

  }

  componentWillMount() {

  }

  // 1.
  async componentDidMount() {
    const uuserID = await this.getUserID()
    const uuserName = await this.getUserName() 
    console.log('chat id is', this.props.navigation.state.params.friend.chatID)
    FBFunctions.setref(this.props.navigation.state.params.friend.chatID)
    FBFunctions.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        chatID: this.props.navigation.state.params.friend.chatID,
        userName: uuserName,
        userID: uuserID
      }))
      
    );
    this.setState({userName : uuserName})
    this.setState({userID : uuserID})
  }// 2.

  componentWillUnmount() {
    FBFunctions.off();  
  }

  createChatID(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		  });
	}

  get user() {  // Return our name and our UID for GiftedChat to parse
    return {
      name: this.state.userName,
      _id: this.state.userID
    };
  }

  async getUserID(){
    const userID = await AsyncStorage.getItem('userID')
    return JSON.parse(userID);
  }

  async getUserName(){
    const userName = await AsyncStorage.getItem('userName')
    return JSON.parse(userName);
  }

  async onSend(messages) {
    messages
    /*
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    */
   //we need to save the message to ourselves and to the friend
   //sending it to ourselves it the easy part
   console.log(messages)
   FBFunctions.send(messages)

   //now to send to friend
   /*
   FBFunctions.setref(this.props.navigation.state.params.friend.friendsID)

   messages[0].user._id = await this.getUserID()
  messages[0].user.name = await this.getUserName()

  FBFunctions.send(messages)
  FBFunctions.setref(await this.getUserID())
  */
   //console.log(messages) 
  }

  render() {
    return (
      <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1 }}
                keyboardVerticalOffset = {Header.HEIGHT }
            >
      <SafeAreaView style = {styles.container}>
        <View style={styles.inner}>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={this.user}
        style={{flex:1}}
      />
      </View>
      </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  inner: {
      padding: 24,
      flex: 1,
      justifyContent: "flex-end",
  },
  header: {
      fontSize: 36,
      marginBottom: 48,
  },
  input: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 36,
  },
  btnContainer: {
      backgroundColor: "white",
      marginTop: 12,
  },
});

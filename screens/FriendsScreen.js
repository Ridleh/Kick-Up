import React, { Component } from 'react';
import {FBFunctions} from '../API/Firebase';
import { Dimensions, AsyncStorage, View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import {Card, Header, Avatar, Button, Icon, Overlay, SearchBar, ListItem, Input} from 'react-native-elements'
import { tsThisType } from '@babel/types';
import {DrawerActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
let devicewWidth = Dimensions.get('window').width;

export default class Friends extends Component{



  constructor() {
    super()
    }

    state = {
        FriendsListSearch : [],
        FriendsList : [],
        pendingFriends : [],
        showSearchFriends: false,
        incomingFriendRequests: [],

        search: ' '
    }

    //componentDidMount(){
        /*
        const users = await FBFunctions.getFriendQuery('test')
        console.log('am i sad?', users)
        this.getPendingFriendRequests()
        this.getIncomingFriendRequests()
        this.getFriends()
        */
      //this.getAllData()
    //}
    async componentDidMount() {
        this.getAllData()
        this.willFocusSubscription = this.props.navigation.addListener(
          'willFocus',
          () => {
            this.getAllData()
            console.log("Refreshed")
          }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    async getAllData(){
        //const users = await FBFunctions.getFriendQuery('test')
        //console.log('am i sad?', users)
        //this.getPendingFriendRequests()
        this.getIncomingFriendRequests()
        this.getFriends()
        this.setState()
    }

    async getFriends(){
        const userID = await this.getUserID();
        const freinds = await FBFunctions.getFriends(userID)
        console.log(freinds)
        this.setState({FriendsList : freinds})
    }

    async getUserName(){
        const userName = await AsyncStorage.getItem('userName')
        return JSON.parse(userName)
    }

    async getUserID(){
        const userID = await AsyncStorage.getItem('userID')
        return JSON.parse(userID);
    }

    async getUserGmail(){
        const userGmail = await AsyncStorage.getItem('gmail')
        return JSON.parse(userGmail);
    }

    async getPendingFriendRequests(){
        const userID = await this.getUserID()
        //console.log('object?',userID)
        const result = await FBFunctions.getPendingFriendRequestsForUser(userID)
        this.setState({pendingFriends : result})
    }

    async getIncomingFriendRequests(){
        const userID = await this.getUserID()
        //console.log('object?',userGmail)
        const result = await FBFunctions.getIncomingFriendRequestsForUser(userID)
        //console.log(result)
        this.setState({incomingFriendRequests : result})
    }

    async findFriends(searchValue){

        var friendFilter = [];
        FBFunctions.getFriendQuery(searchValue).then(results => {
            console.log(results)
            console.log(results.length != 0)
    
            for(user of results){
                if(user.first_name.toLowerCase().includes(searchValue.toLowerCase())){
                    console.log('whack')
                    friendFilter.push(user)
                }
            }
            console.log(friendFilter)
            this.setState({ FriendsListSearch : friendFilter  });
        })
        
    }

    createChatID(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		  });
	}

    createFriendRequest = async (friend, FriendsListSearch) => {
        
        const currentRequests = this.state.pendingFriends;
        if(currentRequests.indexOf(friend) == -1){
            currentRequests.push(friend)
            

            const index = FriendsListSearch.indexOf(friend);
            FriendsListSearch.splice(index,1);
            this.setState({pendingFriends : currentRequests})
        }
        else{
            console.log('something went wrong')
        }
        console.log(friend);
        

        request = {
           requestFromID: await this.getUserID(),
           requestFromName: await this.getUserName(),
           requestToID: friend.id,
           chatID: this.createChatID()
        } 

        console.log(request)

        FBFunctions.createFriendRequest(request)
        //this.getPendingFriendRequests()
    }

    removeFriendRequest = (request) => {
        FBFunctions.deleteFriendRequest(request)
        this.setState()
        this.getAllData()

        
        const pendingList = this.state.pendingFriends
        const index = pendingList.indexOf(friend)
        if(index != -1){
            pendingList.splice(index,1)
            this.setState({pendingFriends : pendingList})
        }
        else{
            console.log('something went wrong :(')
        }
        
    } 

    async acceptFriendRequest(request){
        const userID = await this.getUserID();
        //const chatID = this.createChatID()
        //console.log(request)
        //this friend will show up on your friend list
        const newFriend = {
            friendsName : request.requestFromName,
            friendsID: request.requestFromID,
            chatID: request.chatID
        }
        FBFunctions.updateFriendsList(userID,newFriend)

        //you will show up on their friends list
        const secondFriend = {
            friendsName : await this.getUserName(),
            friendsID: await this.getUserID(),
            //chatID: chatID
            chatID: request.chatID
        }
        FBFunctions.updateFriendsList(request.requestFromID,secondFriend)
        this.removeFriendRequest(request.refID);

    }
 
    render(){
        const photo = this.state.photo
        return(
            <SafeAreaView>
            <View>
            <ScrollView>
                <Header
					containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
					statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
					centerComponent={{ text: 'Friends', style: { color: '#fff' , fontSize: 20} }}
    			    rightComponent={<Ionicons 
                        name="md-person-add"
                        onPress={() => {
                          this.setState({showSearchFriends : true})
                        }}
                        size={30} 
                        color = 'white'     
                        />
                    }
                />
                
                <Overlay
                isVisible={this.state.showSearchFriends}
                onBackdropPress={() => this.setState({showSearchFriends : false})} 
                >
                    <View>
                        <Header
                            containerStyle={{ backgroundColor: '#fff'}}
                            centerComponent={{ text: 'Search New Friends', style: { color: '#4caf50' , fontSize: 20} }}
                        />
                        <SearchBar
                        lightTheme
                        round                        
                        //inputStyle={{backgroundColor: 'white'}}
                        //containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                        containerStyle={{backgroundColor: 'white', 
                            borderWidth: 0, 
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent',
                            borderRadius: 0}}
                        placeholder='Type here...'
                        onSubmitEditing={(searchValue) => this.findFriends(searchValue.nativeEvent.text)}
                        onChangeText={(value) => this.setState({search : value})}
                        value={this.state.search}
                        />
                        <Card title = "Results">
                            
                        { this.state.FriendsListSearch.map((item, i) => (
                                <ListItem
                                key={i}
                                title={item.first_name + " " + item.last_name}
                                //leftIcon={{ name: item.icon }}
                                bottomDivider
                                rightIcon= {<Icon
                                name='add' />}
                                onPress={() => this.createFriendRequest(item, this.state.FriendsListSearch)}
                                />
                            ))
                            }
                        </Card>
                    </View>
                </Overlay>
                        {
                            this.state.incomingFriendRequests.length != 0 &&
                            <Card
                            title='Incoming Friend Requests'>
                                {this.state.incomingFriendRequests.map((item,i) => (
                                    <ListItem
                                    key={i}
                                    title={item.requestFromName}
                                    //leftIcon={{ name: item.icon }}
                                    bottomDivider
                                    leftIcon= {<Icon
                                        onPress={() => this.acceptFriendRequest(item)}
                                    
                                    name='check' />}
                                    rightIcon= {<Icon
                                        onPress={() => this.removeFriendRequest(item.refID)}
                                    
                                    name='clear' />}
                                    />
                                ))}
                            </Card>
                        }
                <Card title={"Friends List"}
					style = {{width:devicewWidth}}>
                        {
                            this.state.FriendsList.length != 0 &&
                                this.state.FriendsList.map((item,i) => (
                                    <ListItem
                                    key={i}
                                    title={item.friendsName}
                                    //leftIcon={{ name: item.icon }}
                                    bottomDivider
                                    leftIcon= {<Icon
                                        onPress={() => this.props.navigation.navigate('profile')}
                                    
                                    name='person' />}
                                    rightIcon= {<Icon
                                        onPress={() => this.props.navigation.navigate('chat', {friend: item})}
                                    
                                    name='chat' />}
                                    />
                                ))
                        }
                        
                    </Card>
                    </ScrollView> 
            </View>
            </SafeAreaView>
        );
    }
}

Friends.navigationOptions = {
	header: null
};

import React, { Component } from 'react';
import {FBFunctions} from '../API/Firebase';
import { Dimensions, AsyncStorage, View, Text, SafeAreaView, ScrollView } from 'react-native';
import {Card, Header, Avatar, Button, Icon, Overlay, SearchBar, ListItem, Input} from 'react-native-elements'
import { tsThisType } from '@babel/types';

let devicewWidth = Dimensions.get('window').width;

export default class Friends extends Component{

    constructor(){
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

    componentDidMount(){
        /*
        const users = await FBFunctions.getFriendQuery('test')
        console.log('am i sad?', users)
        this.getPendingFriendRequests()
        this.getIncomingFriendRequests()
        this.getFriends()
        */
       this.getAllData()
    }

    async getAllData(){
        const users = await FBFunctions.getFriendQuery('test')
        console.log('am i sad?', users)
        this.getPendingFriendRequests()
        this.getIncomingFriendRequests()
        this.getFriends()
        this.setState()
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

    async getFriends(){
        const userID = await this.getUserID();
        const freinds = await FBFunctions.getFriends(userID)
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
        console.log('object?',userID)
        const result = await FBFunctions.getPendingFriendRequestsForUser(userID)
        this.setState({pendingFriends : result})
    }

    async getIncomingFriendRequests(){
        const userGmail = await this.getUserGmail()
        console.log('object?',userGmail)
        const result = await FBFunctions.getIncomingFriendRequestsForUser(userGmail)
        console.log(result)
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

    createFriendRequest = async (friend, FriendsListSearch) => {
        /*
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
        */

        request = {
            requestFromName : await this.getUserName(),
            requestFromID : await this.getUserID(), 
            requestToEmail : friend.gmail,
            first_name : friend.first_name,
            last_name : friend.last_name
        } 

        FBFunctions.createFriendRequest(request)
        this.getPendingFriendRequests()
    }

    removeFriendRequest = (request) => {
        FBFunctions.deleteFriendRequest(request)
        this.setState()
        this.getAllData()

        /*
        const pendingList = this.state.pendingFriends
        const index = pendingList.indexOf(friend)
        if(index != -1){
            pendingList.splice(index,1)
            this.setState({pendingFriends : pendingList})
        }
        else{
            console.log('something went wrong :(')
        }
        */
    } 

    async acceptFriendRequest(request){
        const userID = await this.getUserID();
        console.log(request)
        const newFriend = {
            personsName : request.first_name + " " + request.last_name,
            personsEmail : request.requestToEmail,
        }
        FBFunctions.updateFriendsList(userID,newFriend)
        this.removeFriendRequest(request.refID);

    }
 
    render(){
        return(
            <SafeAreaView>
            <View>
            <ScrollView>
                <Header
					containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
					statusBarProps={{ barStyle: 'light-content' }}
					centerComponent={{ text: 'Friends', style: { color: '#fff' , fontSize: 20} }}
					rightComponent={
						<Avatar
						onPress={() => {
						  console.log("touched registered")
						  this.props.navigation.navigate('Profile')
						}}
				  rounded
				  source={{ 
					uri: this.getPhotoUrl()
				  }}
				/>
					  }	
    			/>
                <View>      
                    <Button
                    icon={
                        <Icon
                        name="person"
                        size={20}
                        color="white"
                        />
                    }
                    iconLeft
                    title="  Tap to search for friends"
                    onPress={() =>
                            this.setState({showSearchFriends : true})
                        }
                    />
                </View>
                <Overlay
                isVisible={this.state.showSearchFriends}
                onBackdropPress={() => this.setState({showSearchFriends : false})} 
                >
                    <View>
                        <SearchBar
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
                            {this.state.FriendsListSearch.length != 0 && <Input placeholder='Enter an invite message'/>}
                        </Card>
                    </View>
                </Overlay>
                        {
                            this.state.pendingFriends.length != 0 &&
                            <Card
                            title='Pending Friend Requests'>
                                {this.state.pendingFriends.map((item,i) => (
                                    <ListItem
                                    key={i}
                                    title={item.first_name + " " + item.last_name}
                                    //leftIcon={{ name: item.icon }}
                                    bottomDivider
                                    rightIcon= {<Icon
                                        onPress={() => this.removeFriendRequest(item.refID)}
                                    
                                    name='clear' />}
                                    />
                                ))}
                            </Card>
                        }
                        {
                            this.state.incomingFriendRequests.length != 0 &&
                            <Card
                            title='Incoming Friend Requests'>
                                {this.state.incomingFriendRequests.map((item,i) => (
                                    <ListItem
                                    key={i}
                                    title={item.first_name + " " + item.last_name}
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
                                    title={item.personsName}
                                    //leftIcon={{ name: item.icon }}
                                    bottomDivider
                                    leftIcon= {<Icon
                                        onPress={() => this.props.navigation.navigate('profile')}
                                    
                                    name='person' />}
                                    rightIcon= {<Icon
                                        onPress={() => this.removeFriendRequest(item)}
                                    
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

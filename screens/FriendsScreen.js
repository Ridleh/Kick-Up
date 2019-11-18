import React, { Component } from 'react';
import {FBFunctions} from '../API/Firebase';
import { Dimensions, AsyncStorage, View, Text, SafeAreaView } from 'react-native';
import {Card, Header, Avatar, Button, Icon, Overlay, SearchBar, ListItem} from 'react-native-elements'

let devicewWidth = Dimensions.get('window').width;

export default class Friends extends Component{

    constructor(){
        super()
    }

    state = {
        FriendsListSearch : [],
        FriendsList : [],
        showSearchFriends: false,
        search: ' '
    }

    async componentDidMount(){
        const users = await FBFunctions.getFriendQuery('test')
        console.log('am i sad?', users)
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
 
    render(){
        return(
            <SafeAreaView>
            <View>
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
                                chevron
                                />
                            ))
                            }
                        </Card>
                    </View>
                </Overlay>
                <Card title={"Friends List"}
					style = {{width:devicewWidth}}>
                        {
                            this.state.FriendsList.length == 0 ?
                            <Text>You have no friends! Add some using the button above</Text>
                            : 
                            <Card></Card>
                        }
                    </Card>
            </View>
            </SafeAreaView>
        );
    }
}

Friends.navigationOptions = {
	header: null
};

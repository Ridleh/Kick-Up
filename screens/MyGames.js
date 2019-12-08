import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  SafeAreaView,
  Dimensions,
  Alert,
  AsyncStorage
} from 'react-native';
import { Avatar, Header, ListItem, Card, Button, Icon } from 'react-native-elements';
import {DrawerActions } from 'react-navigation';
import {FBFunctions} from '../API/Firebase'


export default class MyGames extends Component{

    state = {
        games: FBFunctions.getData()
    }

    

    async getUserID(){
        return AsyncStorage.getItem('userID').then(userID => {
            return userID;
        })
    }

    componentDidMount(){
        /*
       // this.setState({games : this.games})
       console.log('a')
    var gamesData = FBFunctions.DB.ref("/Events")
    gamesData.once('value').then(snapshot =>{
        console.log(snapshot.val().length === 0)
        this.setState({games : snapshot.val()})
        console.log(this.state.games.length != null)
        if(this.state.games.length != null){
            console.log(this.state.games)
        }
    })
    */

    }

    async componentWillMount(){
        this.setState()
    }

    render() {
        return (
            <SafeAreaView style = {{flex: 1}}>
                <Header
                  containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
                  statusBarProps={{ barStyle: 'light-content' }}
                  leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
                  centerComponent={{ text: 'My Games', style: { color: '#fff' , fontSize: 20} }} />
                  <View>
                      {
                          this.state.games.length != 0 &&
                          <View>
                              <Text>help me</Text>
                              </View>
                      }
                      {
        this.state.games.map((item, i) => (
        <TouchableHighlight
          onPress={() => {
            //console.log(this.getPhotoUrl())
            this.props.navigation.navigate('JoinGame', {gameName: item})
          }}>
        <ListItem
          style={{}}
          key={i}
          title={item.gameName}
          
          subtitle=
            {
              item.sport + "\n" + item.players.length + "/" + ((item.participants+1)*5) + " players"
            }
          leftIcon={{ name: item.icon }}
          bottomDivider
          chevron
        />
        </TouchableHighlight>
        ))
    }
</View>
            </SafeAreaView>
        );
    }
}
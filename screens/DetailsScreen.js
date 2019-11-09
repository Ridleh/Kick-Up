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
    Alert
  } from 'react-native';
  import Constants from 'expo-constants';
  import { Avatar, Header, ListItem, Card, Button, Icon } from 'react-native-elements';

export default class DetailsScreen extends Component{
    
    state = {
        name: " im empty :("
    };

    render(){
        return(
            <SafeAreaView>
            <View>
                <Header
      containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
      statusBarProps={{ barStyle: 'light-content' }}
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Home', style: { color: '#fff' , fontSize: 20} }}
      rightComponent={
        <Avatar
        onPress={() => {
          console.log("touched registered")
          this.props.navigation.navigate('Profile')
        }}
  rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }}
/>
      }
    />
                <Text>{JSON.stringify(this.props.navigation.getParam('gameName'))}</Text>
            </View>
            </SafeAreaView>
        )
    }
}

DetailsScreen.navigationOptions = {
    header: null
};
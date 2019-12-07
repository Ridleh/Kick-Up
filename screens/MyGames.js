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
import { Left, Right, Icon } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import {FBFunctions} from '../API/Firebase';
import { firebaseConfig } from '../config';
import * as firebase from 'firebase';
import Constants from 'expo-constants';
import { fetchUpdateAsync } from 'expo/build/Updates/Updates';



class MyGames extends Component {
    render() {
        return (
            <SafeAreaView style = {{flex: 1}}>
                <Header
                  containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
                  statusBarProps={{ barStyle: 'light-content' }}
                  leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                  centerComponent={{ text: 'My Games', style: { color: '#fff' , fontSize: 20} }}
            </View>
        );
    }
}
const styles = StyleSheet.create({

});

export default MyGames;
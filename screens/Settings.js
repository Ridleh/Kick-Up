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



class Settings extends Component {
    render() {
        return (
            <SafeAreaView style = {{flex: 1}}>
                <Header
                  containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
                  statusBarProps={{ barStyle: 'light-content' }}
                  leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
                  centerComponent={{ text: 'Settings', style: { color: '#fff' , fontSize: 20} }} />
            </SafeAreaView>
        );
    }
}

export default Settings;
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
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class Settings extends Component{
    render() {
      return(
        <SafeAreaView>
        <View style={styles.container}>
        <Header
          containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
          centerComponent={{ text: 'Settings', style: { color: '#fff' , fontSize: 20} }} />

        <View style={{height: 300, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/kickup.png')} style={{height: 200, width: 200, borderRadius: 50 }} />
        </View>
          <View style={styles.body}>
              <View style={styles.bodyContent}>
                <TouchableOpacity
                  // onPress={() => this.changeStateVar(false)} 
                  style={styles.buttonContainer}>
                  <Text style={{fontWeight: 'bold'}}>Remove Ads</Text>  
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.changeStateVar(false)} 
                  style={styles.buttonContainer}>
                  <Text style={{fontWeight: 'bold'}}>Clear Local Cache</Text>  
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.changeStateVar(false)} 
                  style={styles.buttonContainer}>
                  <Text style={{fontWeight: 'bold'}}>Log Out</Text>  
                </TouchableOpacity>
              </View>
          </View>
          </View>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#4caf50",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:0,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:15,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    borderWidth:1,
    borderColor: '#000',
    backgroundColor: "#fff",
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  logInInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 20,
    margin: 10,
    borderRadius: 20,
    //underlineColorAndroid: 'transparent'
  }
});

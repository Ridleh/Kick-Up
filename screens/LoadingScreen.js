import React, { Component } from 'react';
import {AsyncStorage, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class LoadingScreen extends Component {

  constructor(){
    super();
    this.bootStrapAsync();
  }
  componentDidMount() {
    //this.checkUserID();
    //this.bootStrapAsync();
  }

  bootStrapAsync = async() => {
    const userID = JSON.parse( await AsyncStorage.getItem("userID"));
    this.props.navigation.navigate( userID ? "App" : "Auth");
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        console.log('Auth state change called')
        if (user) {
          this.props.navigation.navigate('HomeScreen');
        } else {
          this.props.navigation.navigate('LoginScreen');
        }
      }.bind(this)
    );
  };

    checkUserID = () => {
    AsyncStorage.getItem("userID").then((value) => {
      //console.log(value)
    const valueParsed = JSON.parse(value)
    if(valueParsed){
      this.props.navigation.navigate('HomeScreen');
    } 
    else {
      this.props.navigation.navigate('LoginScreen');
    }
    });
		
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
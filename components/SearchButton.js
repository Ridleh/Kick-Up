
import React, { Component } from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  Platform
} from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"


const WIDTH = Dimensions.get('window').width;

export const SearchButton = function(props) {

  return(
    
      <GooglePlacesAutocomplete
        placeholder = 'Where?'
        placeholderTextColor = '#333'


        onPress = {(data, details = null) => {
          props.notifyChange(details.geometry.location);
        }}
        query = {{
          key: 'AIzaSyD5rugAfJaNW4dDCMKiO-aeO1-5fqlLhXc',
          language: 'en'
        }}
        textInputProps={{
          autoCapitalize: "none",
          autoCorrect: false
        }}
        fetchDetails = {true}
        enablePoweredByContainer = {false}
        returnKeyType={'search'} // Can be left out for default return key 
        listViewDisplayed={false}    // true/false/undefined
        styles = {{
          container: {
            position: 'absolute',
            top: Platform.select({ ios: 60, android: 40}),
            width: '100%'
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            height: 54,
            marginHorizontal: 20,
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            height: 54,
            margin: 0,
            borderRadius: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {x: 0, y: 0},
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: '#DDD',
            fontSize: 18
          },
          listView: {
            borderWidth: 1,
            borderColor: "#DDD",
            backgroundColor: "#FFF",
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: {x: 0, y: 0},
            shadowRadius: 15,
            marginTop: 10
          },
          description: {
            fontSize: 16
          },
          row: {
            padding: 10,
            height: 50
          }
        }}
        debounce={300}
      />

    )

  
}
/*
const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: (WIDTH-40),
    height: 60,
    top: 100,
    left: 20,
    borderRadius: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  leftCol: {
    flex: 1,
    alignItems: 'center',
  },
  centerCol: {
    flex: 4
  },
  rightCol: {

  },
})*/

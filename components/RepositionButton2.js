
import React, { Component } from 'react';
import { 
  StyleSheet,
  View, 
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;



export const RepositionButton = function(props) {
  //const cb = props.cb ? props.cb : () => console.log('fuck');
  const bottom = props.bottom ? props.bottom: 20;

  return(
    <TouchableOpacity onPress={()=>{

      console.log("fuuuck");
      props.cb();
    }}
    style = {[styles.container, {top: HEIGHT - bottom}]}

    >
    <Image source={require('../assets/reset_location.png')} style={{height: 35, width:35 }} />
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    left: WIDTH - 85,
    borderRadius: 50,
    shadowColor: '#696969',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

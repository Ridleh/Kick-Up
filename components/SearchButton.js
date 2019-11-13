import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  View, 
  Dimensions 
} from 'react-native';


const WIDTH = Dimensions.get('window').width;

export const SearchButton = function(props) {
  

  return(
      <TouchableOpacity onPress = {() => {}} style = {styles.container}>
        <View style = {styles.leftCol}>
          <Text style = {{fontSize: 8}}>{'\u25A0'}</Text>
        </View>

        <View style = {styles.centerCol}>
          <Text style = {{fontSize: 21, color: '#545454'}}>
            Where?
          </Text>
        </View>

        <View style = {styles.rightCol}>
          
        </View>

      </TouchableOpacity> 


    )
}

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
})

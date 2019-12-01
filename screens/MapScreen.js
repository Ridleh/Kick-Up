import React from 'react';
import MapView from 'react-native-maps';
import {Header, Button } from 'react-native-elements';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import { SearchButton } from '../components/SearchButton';

import markerImage from "../assets/current_location.png";

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.03
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

export default class Maps extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
      
    }
    this.watchID = null


  }
  

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({region: initialRegion})
      this.setState({markerPosition: initialRegion})
    }, (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      } 

      this.setState({region: lastRegion})
      this.setState({markerPosition: lastRegion})
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  onMapRegionChange(region) {
    this.setState({region});
  }

  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>

        
        
        <MapView
          region={this.state.region}
          //onRegionChange = {(reg) => this.props.onMapRegionChange(reg)}
          style={styles.mapStyle}>
          <MapView.Marker
            coordinate = {this.state.region}>
            <Image source={require('../assets/current_location.png')} style={{height: 35, width:35 }} />
            
            <View style = {styles.radius}>
              <View style = {styles.marker}>

              </View>

            </View>
          </MapView.Marker>

          
        </MapView>

        <SearchButton notifyChange = {(loc) => this.getCoordsFromName(loc)}/>
        <Button
            title="->"
            type="solid"
            onPress={() => {
                this.props.navigation.navigate('CreateGame', {
                 loc_lat : this.state.region.latitude,
                 loc_long : this.state.region.longitude,
               })

            }}
          />
      </View>
    );
  }
}

////Maps.navigationOptions = {
  //header: null
//};


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 129,
  },
  button: {
    alignSelf:'stretch',
    alignItems:'center',
    padding:20,
    backgroundColor:'#4caf50',
    marginTop:30,
  },
});
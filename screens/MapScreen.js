import React from 'react';
import MapView from 'react-native-maps';
import {Header, Button } from 'react-native-elements';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Geocoder from 'react-native-geocoding'; 

import {DrawerActions } from 'react-navigation';

import { SearchButton } from '../components/SearchButton';
import { RepositionButton } from '../components/RepositionButton';

import markerImage from "../assets/current_location.png";

Geocoder.init('AIzaSyCpsRkuQVnkDNRS6iks507IbCEBt2hBLYs');


const {width, height} = Dimensions.get('window')
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
        longitudeDelta: 0,
      },
      initialRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      name: '',
      address: '',
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      
      
      
    }
    this.watchID = null


  }
  

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat_ = parseFloat(position.coords.latitude)
      var long_ = parseFloat(position.coords.longitude)

      var latlng = {
        lat: lat_,
        lng: long_,
      }

      var initialRegion = {
        latitude: lat_,
        longitude: long_,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }


      Geocoder.from({lat: lat_, lng: long_}).then(response => {
        //console.log("address: " + response.results[0].formatted_address);
        const addr = response.results[0].formatted_address;

        this.setState({
          name: 'User Location',
          address: addr,
        });
      }).catch(error => console.warn(error));

      this.setState({region: initialRegion})
      this.setState({initialRegion: initialRegion})
      this.setState({markerPosition: initialRegion})
    }, (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat_ = parseFloat(position.coords.latitude)
      var long_ = parseFloat(position.coords.longitude)

      var latlng = {
        lat: lat_,
        loc: long_,
      }
      
      var lastRegion = {
        latitude: lat_,
        longitude: long_,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
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

  getAddressDetails(nam,addr) {
    this.setState({
      name: nam,
      address: addr
    })
  }

  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    });
  }

  centerMap() {

      console.log("center");
      console.log(this.state.initialRegion.latitude);
      console.log(this.state.region.latitude);
      this.setState({
        region: {
          latitude: this.state.initialRegion.latitude,
          longitude: this.state.initialRegion.longitude,
          latitudeDelta: this.state.initialRegion.latitudeDelta,
          longitudeDelta: this.state.initialRegion.longitudeDelta,
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ backgroundColor: '#4caf50'}} //THIS CHANGES THE HEADER COLOR
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
          centerComponent={{ text: 'Set Game Location', style: { color: '#fff' , fontSize: 20} }} />

        
        
        <MapView
          region={this.state.region}
          //onRegionChange = {(reg) => this.props.onMapRegionChange(reg)}
          showUserLocation
          //ref = {(map) => {this.map = map}}
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
        <Button
            title="Enter"
            type = "solid"
            onPress={() => {

                this.props.navigation.navigate('CreateGame', {
                 loc_lat : this.state.region.latitude,
                 loc_long : this.state.region.longitude,
                 loc_address: this.state.address,
                 loc_name: this.state.name,
               })

            }}
            style = {styles.button}/>


        <RepositionButton cb = {() => { this.centerMap()}} />
        <SearchButton 
          RegionChange = {(loc) => this.getCoordsFromName(loc)}
          AddressSearch = {(nam,addr) => this.getAddressDetails(nam,addr)}
        />
        
        
      </View>
    );
  }
}

Maps.navigationOptions = {
  header: null
};


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    backgroundColor: "#4caf50",
    height:200,
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 129,
    zIndex: -1,
  },
  button: {
    flex: 1,
    flexDirection:'row',
    position:'absolute',
    bottom:10,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderRadius: 20
  },
});
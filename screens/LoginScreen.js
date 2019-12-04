import React, { Component } from 'react';
import { StyleSheet, View, Text,TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { Image, AsyncStorage } from 'react-native';

export default class LoginScreen extends Component {
	isUserEqual = (googleUser, firebaseUser) => {
	    if (firebaseUser) {
	      var providerData = firebaseUser.providerData;
	      for (var i = 0; i < providerData.length; i++) {
	        if (
	          providerData[i].providerId ===
	            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
	          providerData[i].uid === googleUser.getBasicProfile().getId()
	        ) {
	          return true;
	        }
	      }
	    }
    	return false;
  };
     onSignIn = googleUser => {
		console.log('Google Auth Response', googleUser);
		this.saveUserID(googleUser)
	    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
	    var unsubscribe = firebase.auth().onAuthStateChanged(
	      function(firebaseUser) {
	        unsubscribe();
	        // Check if we are already signed-in Firebase with the correct user.
	        if (!this.isUserEqual(googleUser, firebaseUser)) {
	          // Build Firebase credential with the Google ID token.
	          var credential = firebase.auth.GoogleAuthProvider.credential(
	            googleUser.idToken,
	            googleUser.accessToken
	          );
	          // Sign in with credential from the Google user.
	          firebase
	            .auth()
	            .signInWithCredential(credential)
	            .then(function(result) {
				  console.log('user signed in ');
				  console.log(result);
				  console.log("YOOOOOO " + result.user.providerData[0].uid)
	              if (result.additionalUserInfo.isNewUser) {
	                firebase
	                  .database()
	                  .ref('/users/' + result.user.uid)
	                  .set({
	                  	profile_picture: result.additionalUserInfo.profile.picture,
	                    gmail: result.user.email,
	                    id: result.user.providerData[0].uid,
	                    first_name: result.additionalUserInfo.profile.given_name,
	                    last_name: result.additionalUserInfo.profile.family_name,
	                  })
	                  .then(function(snapshot) {
	                    // console.log('Snapshot', snapshot);
	                  });
	              }
	            })
	            .catch(function(error) {
	              // Handle Errors here.
	              var errorCode = error.code;
	              var errorMessage = error.message;
	              // The email of the user's account used.
	              var email = error.email;
	              // The firebase.auth.AuthCredential type that was used.
	              var credential = error.credential;
	              // ...
	            });
	        } else {
	          console.log('User already signed-in Firebase.');
	        }
	      }.bind(this)
	    );
	  };

	async saveUserID(user){
			try{
				await AsyncStorage.setItem("userID", JSON.stringify(user.user.id));
				await AsyncStorage.setItem("photoUrl", JSON.stringify(user.user.photoUrl));
				await AsyncStorage.setItem("userName", JSON.stringify(user.user.name));
				await AsyncStorage.setItem("email", JSON.stringify(user.user.email));
				await AsyncStorage.setItem("id", JSON.stringify(user.user.id));
				await AsyncStorage.setItem("gmail", JSON.stringify(user.user.email));
			}
			catch(error){
				Alert.alert("something went wrong: " + error)
			}
	}


	signInWithGoogleAsync = async () => {
	  try {
	    const result = await Google.logInAsync({
	      behavior: 'web',
	      androidClientId: '49314623943-43m3pugq6ttc14gbp2c078famd8thm96.apps.googleusercontent.com',
	      iosClientId: '49314623943-9mepdg7mbmku5418l28b1jhd1g4tm2qm.apps.googleusercontent.com',
	      scopes: ['profile', 'email'],
	    });

	    if (result.type === 'success') {
			this.onSignIn(result);
			this.props.navigation.navigate('Home')
	      	return result.accessToken;
	    } else {
	      	return { cancelled: true };
	    }
	  } catch (e) {
	    return { error: true };
	  }
	}

  render() {
    return (
      <React.Fragment>
      	<Image
         source={require('./LoginPicture.png')} style={styles.image}
        />
      	<View style={styles.joinform}>
      		<TouchableOpacity 
      			style = {styles.button}
      			onPress={() => this.signInWithGoogleAsync()}
      		>
      			<Text style={styles.btntext}>Sign In</Text>
      		</TouchableOpacity>
      	</View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({ 
  joinform: {
    alignSelf: 'center',

  },
  header: {
    fontSize: 36,
    alignSelf:'center',
    fontWeight: 'bold',
    color: '#000000',
    paddingBottom: 10,
    marginBottom: 50,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  text: {
    //alightSelf: 'stretch',
    alignSelf:'center',
    height: 40,
    marginBottom: 30,
    color: '#000000',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  text_important: {
    fontSize: 18,
    fontWeight: 'bold',
    //alightSelf: 'stretch',
    alignSelf:'center',
    height: 40,
    marginBottom: 30,
    color: '#000000',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  text_title: {
    fontSize: 24,
    fontWeight: 'bold',
    //alightSelf: 'stretch',
    alignSelf:'center',
    height: 40,
    marginBottom: 30,
    color: '#000000',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    //alightSelf:'stretch',
    alignItems:'center',
    padding:20,
    backgroundColor:'#4caf50',
    marginTop:20,
  },
  btntext: {
    fontSize: 24,
    alignSelf:'center',
    color: '#fff',
  },
  placeholderStyle: {
        fontSize: 10,
        color: '#000',
    },
    image: {
      alignSelf: 'center',
      height: 400,
      width: 400,

      marginTop: 100, 

    }
});

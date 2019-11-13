import * as firebase from 'firebase';
import { getProvidesAudioData } from 'expo/build/AR';

export const FBFunctions = {

  async storeData(data){
    await firebase.database().ref("Test Arrays").push({ 
      sport: data.sport,
			participants: + data.participants,
			gameName : data.gameName,
			date:  data.date,
			location : data.location,
			description : data.description,
    });
    console.log("success");
 },

  getData(){
    var events = [];
      firebase.database().ref("Events").on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          events.push(childSnapshot.val())
        })
      }, function(err){
        console.log("The read failed: " + err);
      })
      console.log(events)
    if(events.length == 0){
      //return this.getData();
    }
    return events;
 }

}

/*
switch to mongoDB if firebase doesnt work
https://levelup.gitconnected.com/react-native-mongodb-stitch-building-a-crud-application-without-a-server-3e4ae0b34d67
*/

/*
//TODO: read/write only for auth users
https://stackoverflow.com/questions/37403747/firebase-permission-denied

//default firebase DB rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
*/

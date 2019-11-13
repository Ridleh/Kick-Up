import * as firebase from 'firebase';
import { getProvidesAudioData } from 'expo/build/AR';

export const FBFunctions = {

  async storeData(data){
    console.log("calling FB push")
    dataReference = await firebase.database().ref("/Events/").push();
    dataReference.set({ 

      sport: data.sport,
			participants: data.participants,
			gameName : data.gameName,
			date:  data.date,
			location : data.location,
      description : data.description, 
      players: data.players,
      ID: dataReference.toString().slice(-20)
      
    })
    console.log("success");
 },

 async updateData(data){
  console.log("calling FB update")
    await firebase.database().ref("/Events/" + data.ID).update({ 

      /*
      sport: this.state.sport,
			participants: + this.state.participants,
			gameName : this.state.name,
			date:  this.state.date,
			location : this.state.location,
			description : this.state.description,
			players : this.state.players
      */

      sport: data.sport,
			participants: data.participants,
			gameName : data.gameName,
			date:  data.date,
			location : data.location,
      description : data.description, 
      players: data.players
    });
    console.log("success");
 },

  getData(){
    var events = [];
      firebase.database().ref("/Events").on("value", function(snapshot){
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

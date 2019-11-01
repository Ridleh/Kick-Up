import * as firebase from 'firebase';
import { getProvidesAudioData } from 'expo/build/AR';

export const FBFunctions = {

 async storeData(data){
    await firebase.database().ref().set({ 
        sport: data.sport,
        participants: data.participants,
        name: data.name,
        date: data.date,
        location: data.location,
        description: data.description,
    });
    console.log("success?");
 },

 async getData(){
     await firebase.database().ref().once("value").then(snapshot =>{
         console.log(snapshot);
     });
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

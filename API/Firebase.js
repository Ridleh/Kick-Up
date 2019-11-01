import * as firebase from 'firebase';

 var DBinitilized = false;

export const FBFunctions = {

 async initialize(){
     if(!DBinitilized){
     try{
            await firebase.initializeApp({
                apiKey: "AIzaSyDtkejkI80YPOD1IDOOBLuPV3XiZrXtnc0",
                authDomain: "kick-up-598aa.firebaseapp.com",
                databaseURL: "https://kick-up-598aa.firebaseio.com",
                projectId: "kick-up-598aa",
                storageBucket: "kick-up-598aa.appspot.com",
                messagingSenderId: "259103815275",
                appId: "1:259103815275:web:42b0386d2f506b8431a32e"
        })
     }
     catch(err){
        console.log(err);
        if(err.message.includes("[DEFAULT]")){
            DBinitilized = true;
        }
     }
    }
    else{
        console.log("don't call this again");
    }
 },

 async StoreData(data){
    await firebase.database().ref().set({ 
        sport: data.sport,
        participants: data.participants,
        name: data.name,
        date: data.date,
        location: data.location,
        description: data.description,
    });
    console.log("success?");
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

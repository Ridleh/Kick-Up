import * as firebase from 'firebase';
import { getProvidesAudioData } from 'expo/build/AR';
import {AsyncStorage} from 'react-native'

export const FBFunctions = {

  chatIDGlobal : -1,

  init(){
    console.log('a')
    /*
    AsyncStorage.getItem('userID').then(userID =>{
      console.log('b',userID)
      this.userIDGlobal = JSON.parse(userID)
      //return JSON.parse(userID);
      console.log('c')
    })
    */
    //AsyncStorage.getItem('userID')
    //this.observeAuth();
  },

  get DB(){
    return firebase.database();
  },

  async getMyGames(userID){
    
  },

  async storeData(data){
    console.log("calling FB push")
    dataReference = await firebase.database().ref("/Events/").push();
    dataReference.set({ 

      
      sport: data.sport,
			participants: data.participants,
			gameName : data.gameName,
      date:  data.date,
      createdBy: data.createdBy,
      createdByID: data.createdByID,
      //dateFormatted: data.DateFormatted,
      //location : data.location,
      icon : data.icon,
      location_lat : data.location_lat,
      location_long : data.location_long,
      location_name : data.location_name,
      location_address : data.location_address,
      //location : data.location,
      description : data.description, 
      players: data.players,
      ID: dataReference.toString().slice(-20),
      chatID: data.chatID
      
    })
    console.log("success");
 },

 async updateData(data){
   //firebase.firestore().collection().doc()
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
      createdBy: data.createdBy,
      date:  data.date,
      icon: data.icon,
      //location : data.location,
			location_lat : data.location_lat,
		  location_long : data.location_long,
      location_name : data.location_name,
      location_address : data.location_address,
      description : data.description, 
      players: data.players
    });
    console.log("success");
 },
  async removeData(data){
    console.log("calling FB remove")
    await firebase.database().ref("/Events/" + data.ID).remove();
    console.log("removed");
 },


 
 async updateFriendsList(userID, friend){

    dataReference =  await firebase.database().ref("/Friends Lists/" + userID).push();
    dataReference.set({
      /*
        personsName: friend.personsName,
        personsEmail: friend.personsEmail,
        refID: dataReference.toString().slice(-20),
        userID: userID
        */
       friendsID: friend.friendsID,
       friendsName: friend.friendsName,
       chatID: friend.chatID,
       refID: dataReference.toString().slice(-20),
    })
 },

  getData(){
    console.log(userID)
    var events = [];
      firebase.database().ref("/Events").on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
          events.push(childSnapshot.val())
        })
      }, function(err){
        console.log("The read failed: " + err);
      })
      //console.log(events)
    if(events.length == 0){
      //return this.getData();
    }
    return events;
 },

 async getFriends(userID){
   friendsList = []
    var ref = firebase.database().ref("/Friends Lists/" + userID);
    await ref.orderByChild('friendsID').on('value', function(snapshots){
      snapshots.forEach(function(childSnapshot){
        friendsList.push(childSnapshot.val())
      })
    });
    return friendsList;
 },

 async getFriendQuery(){
  var events = [];
  await firebase.database().ref("/users").on("value", function(snapshot){
    snapshot.forEach(function(childSnapshot){
      events.push(childSnapshot.val())
    })
    
  }, function(err){
    console.log("The read failed: " + err);
  })
  //console.log(events)
if(events.length == 0){
  //return this.getData();
}
//console.log('bum', events)
return events;
 },

async createFriendRequest(request){
  //console.log(request)
  dataReference = await firebase.database().ref("/Friend Requests/").push();
  dataReference.set({
    requestFromID: request.requestFromID,
    requestFromName: request.requestFromName,
    requestToID: request.requestToID,
    chatID: request.chatID,
    refID: dataReference.toString().slice(-20),
  })
},

async getPendingFriendRequestsForUser(userID){
  const pendingRequests = [];
  var ref = firebase.database().ref("Friend Requests");
  await ref.orderByChild("requestFromID").equalTo(userID).on("value", function(snapshots) {
    snapshots.forEach(function(childSnapshot){
      pendingRequests.push(childSnapshot.val())
    })
    //console.log(pendingRequests)
    
  });
  return pendingRequests;
},

async getUserInfo(userGmail){
  const ref = firebase.database().ref("/users");
  await ref.orderByChild('gmail').equalTo(userGmail).on('value', function(snapshots){
    return snapshots.val()
  })
},

async getIncomingFriendRequestsForUser(userID){
  const incomingRequests = [];
  var ref = firebase.database().ref("Friend Requests");
  await ref.orderByChild("requestToID").equalTo(userID).on("value", function(snapshots) {
    snapshots.forEach(function(childSnapshot){
      incomingRequests.push(childSnapshot.val())
    })
    //console.log(pendingRequests)
    
  });
  return incomingRequests;
},

deleteFriendRequest(ID){
  firebase.database().ref("/Friend Requests/" + ID).remove();

},

observeAuth(){
  firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
},

onAuthStateChanged(user){
  if (!user) {
    try {
      // 4.
      firebase.auth().signInAnonymously();
    } 
    catch ({ message }) {
      //alert(message);
      console.log(message)
    }
  }
},

setref(ref){
  this.chatIDGlobal = ref
},

get ref(){
  return firebase.database().ref('/messages/' + this.chatIDGlobal);
},

on(callback){
    this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)))
},

parse(snapshot){
  // 1.
  const { timestamp: numberStamp, text, user } = snapshot.val();
  const { key: _id } = snapshot;  // 2.
  const timestamp = new Date(numberStamp);  // 3.
  const message = {
    _id,
    timestamp,
    text,
    user,
  };
 return message;
},

off() {
  this.ref.off();
},

get uid() {
  return this.userIDGlobal;
},

get timestamp() {
  return firebase.database.ServerValue.TIMESTAMP;
},

send(messages){
  console.log(messages)
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];    // 4.
    const message = {
      text,
      user,
      timestamp: this.timestamp,
    };
    this.append(message);
  }
},

append(message){
  this.ref.push(message)
},

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

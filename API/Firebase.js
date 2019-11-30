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
      //dateFormatted: data.DateFormatted,
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

 async updateFriendsList(userID, friend){
    dataReference =  await firebase.database().ref("/Friends Lists/" + userID).push();
    dataReference.set({
        personsName: friend.personsName,
        personsEmail: friend.personsEmail,
        refID: dataReference.toString().slice(-20),
        userID: userID
    })
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
      //console.log(events)
    if(events.length == 0){
      //return this.getData();
    }
    return events;
 },

 async getFriends(userID){
   friendsList = []
    var ref = firebase.database().ref("/Friends Lists/" + userID);
    await ref.orderByChild('userID').equalTo(userID).on('value', function(snapshots){
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
  console.log(request)
  dataReference = await firebase.database().ref("/Friend Requests/").push();
  dataReference.set({
    requestFromID: request.requestFromID,
    requestFromName: request.requestFromName,
    requestToEmail: request.requestToEmail,
    first_name: request.first_name,
    last_name : request.last_name,
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

async getIncomingFriendRequestsForUser(userGmail){
  const incomingRequests = [];
  var ref = firebase.database().ref("Friend Requests");
  await ref.orderByChild("requestToEmail").equalTo(userGmail).on("value", function(snapshots) {
    snapshots.forEach(function(childSnapshot){
      incomingRequests.push(childSnapshot.val())
    })
    //console.log(pendingRequests)
    
  });
  return incomingRequests;
},

deleteFriendRequest(ID){
  firebase.database().ref("/Friend Requests/" + ID).remove();

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

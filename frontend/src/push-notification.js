import firebase from 'firebase';


export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyBPEbhbJqmEtx10J4bqCNkwn-DcWXCiNAU",
    authDomain: "e-commerce-9984b.firebaseapp.com",
    databaseURL: "https://e-commerce-9984b.firebaseio.com",
    projectId: "e-commerce-9984b",
    storageBucket: "e-commerce-9984b.appspot.com",
    messagingSenderId: "1016668624662"
  });
  navigator.serviceWorker
    .register('/firebase-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
    
}
export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token:', token);
    return token;
  } catch (error) {
    console.error(error);
  }
}
export const sendmessageusertoseller = async (username,message,shopname) => {
    firebase.database().ref('users/'+username+'/sellers/'+shopname).push({
      message: message,
      author : 'me',
    },function(error) {
      if (error) {
        console.log("error",error)
      } else {
        console.log("sucess")
      }
      });
    firebase.database().ref('sellers/'+shopname+'/users/'+username).push({
      message: message,
      author : 'them',
    });
  } 


export const sendmessagesellertouser = async (username,message,shopname) => {
  try {
    firebase.database().ref('users/'+username).push({
      message: message,
      author : 'them',
      shopname : shopname
    },function(error) {
      if (error) {
        console.log("error",error)
      } else {
        console.log("sucess")
      }
      });
    firebase.database().ref('seller/'+shopname).push({
      message: message,
      author : 'me',
      username : username
    });
  } catch (error) {
    console.error(error);
  }
}


export function getmessages(username,shopname){
  
  var getChatData = firebase.database().ref('users/' + username + '/sellers/'+shopname);
   return getChatData;
  

  } 

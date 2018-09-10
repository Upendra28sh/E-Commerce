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
 
    
}


export const sendmessagesellertouser = async (username,message,shopname) => {
  firebase.database().ref('users/'+username+'/sellers/'+shopname).push({
    message: message,
    author : 'them',
  },function(error) {
    if (error) {
      console.log("error",error)
    } else {
      console.log("sucess")
    }
    });
  firebase.database().ref('sellers/'+shopname+'/users/'+username).push({
    message: message,
    author : 'me',
  });
} 



export function getmessages(username,shopname){
  
  var getChatData = firebase.database().ref('sellers/'+shopname+'/users/'+username);
   return getChatData;
  } 

  
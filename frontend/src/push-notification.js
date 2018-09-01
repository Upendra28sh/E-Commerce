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
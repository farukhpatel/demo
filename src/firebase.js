import firebase from 'firebase/app';
import 'firebase/messaging';

var config = {
    apiKey: "AIzaSyBtdGTnJIjsjV1nRKXS_OWdv8IBjiewhg8",
    authDomain: "bandhify-34127.firebaseapp.com",
    projectId: "bandhify-34127",
    storageBucket: "bandhify-34127.appspot.com",
    messagingSenderId: "528731919394",
    appId: "1:528731919394:web:67a46491d45a072173e67b",
    measurementId: "G-SLWLC9G6DS"
};
// Initialize Firebase
firebase.initializeApp(config);
export default firebase;
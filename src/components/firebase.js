import firebase from "firebase/app";
import "firebase/messaging";

var config = {
  // apiKey: "AIzaSyBtdGTnJIjsjV1nRKXS_OWdv8IBjiewhg8",
  // authDomain: "bandhify-34127.firebaseapp.com",
  // projectId: "bandhify-34127",
  // storageBucket: "bandhify-34127.appspot.com",
  // messagingSenderId: "528731919394",
  // appId: "1:528731919394:web:67a46491d45a072173e67b",
  // measurementId: "G-SLWLC9G6DS",
  apiKey: "AIzaSyA0G6lLOIX4oPNgDlDNbohB4UnkgqDakDk",
  authDomain: "test-5b61a.firebaseapp.com",
  projectId: "test-5b61a",
  storageBucket: "test-5b61a.appspot.com",
  messagingSenderId: "820347917785",
  appId: "1:820347917785:web:499db5408ebfef595f75c8",
  measurementId: "G-52KBXT2G6E",
};
// Initialize Firebase
firebase.initializeApp(config);
export default firebase;

import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyA0G6lLOIX4oPNgDlDNbohB4UnkgqDakDk",
    authDomain: "test-5b61a.firebaseapp.com",
    projectId: "test-5b61a",
    storageBucket: "test-5b61a.appspot.com",
    messagingSenderId: "820347917785",
    appId: "1:820347917785:web:499db5408ebfef595f75c8",
    measurementId: "G-52KBXT2G6E"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
export const getToken = (setTokenFound) => {
    return messaging.getToken().then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });
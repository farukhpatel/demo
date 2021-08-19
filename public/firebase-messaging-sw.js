// import { toast } from "react-toastify";

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
// import firebase from 'firebase/app';
// import 'firebase/messaging';

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
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message come ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
// window.addEventListener('load', e => {
//   if (!('serviceWorker' in navigator)) {
//     console.log('Service worker not supported');
//     return;
//   }
//   navigator.serviceWorker.register('firebase-messaging-sw.js')
//     .then(function () {
//       console.log('Service Worker Registered');
//     })
//     .catch(function (error) {
//       console.log('Service Worker Registration failed:', error);
//     });
// });
navigator.serviceWorker.ready.then(
  function (serviceWorkerRegistration) {
    var options = {
      userVisibleOnly: true,
      applicationServerKey: "BC-XPdNxh04yOnQDsRaJGBqy542wHsZVo3Rl2eoajhpoEczniA1ZgUBdeaRO3nLl_VhqR5iXCYNd4ZjsitZ5c4E"
    };
    serviceWorkerRegistration.pushManager.subscribe(options).then(
      function (pushSubscription) {
        console.log(pushSubscription.endpoint);
        // The push subscription details needed by the application
        // server are now available, and can be sent to it using,
        // for example, an XMLHttpRequest.
      }, function (error) {
        // During development it often helps to log errors to the
        // console. In a production environment it might make sense to
        // also report information about errors back to the
        // application server.
        console.log(error);
      }
    );
  });
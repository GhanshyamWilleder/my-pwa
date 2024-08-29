/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js")

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDHzi9Ifsyz2lvjl6svbNhtae9s9HKSac",
  authDomain: "my-pwa-883f3.firebaseapp.com",
  projectId: "my-pwa-883f3",
  storageBucket: "my-pwa-883f3.appspot.com",
  messagingSenderId: "988477130342",
  appId: "1:988477130342:web:aa72dc194c913d91548fa7"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    )
    // Customize notification here
    const notificationTitle = "Background Message Title"
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
  })
// src/firebaseConfig.js
import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDHzi9Ifsyz2lvjl6svbNhtae9s9HKSac",
  authDomain: "my-pwa-883f3.firebaseapp.com",
  projectId: "my-pwa-883f3",
  storageBucket: "my-pwa-883f3.appspot.com",
  messagingSenderId: "988477130342",
  appId: "1:988477130342:web:aa72dc194c913d91548fa7",
}

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

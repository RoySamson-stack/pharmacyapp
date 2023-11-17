// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTlC9rTkHUWC2g8WWwSZgZiuYeqETsnAQ",
  authDomain: "mobile-app-51432.firebaseapp.com",
  projectId: "mobile-app-51432",
  storageBucket: "mobile-app-51432.appspot.com",
  messagingSenderId: "777207287789",
  appId: "1:777207287789:web:e9685247b28f8da2a2a1e4",
  measurementId: "G-S57R3SJHCW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const db=getFirestore();

export {auth,db};
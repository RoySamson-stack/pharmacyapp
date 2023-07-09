// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwBpYM1VFXiyJ-KXvBuAJPqFi29Y_DE50",
  authDomain: "drug-store-64eff.firebaseapp.com",
  projectId: "drug-store-64eff",
  storageBucket: "drug-store-64eff.appspot.com",
  messagingSenderId: "1043453024914",
  appId: "1:1043453024914:web:50d4f739ab447a9be7e44b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const db=getFirestore();

export {auth,db};
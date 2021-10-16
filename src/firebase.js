// Import the functions you need from the SDKs you need


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/storage";
import "firebase/compat/firestore";
import config from "./config.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
firebase.initializeApp(config.firebaseConfig);
console.log("Firestore",firebase.firestore);
export const firestore = firebase.firestore();
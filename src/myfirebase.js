// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from "firebase/database"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhLbePe0Sqy3qPnNAQdaEQb1sHqnZeroc",
    authDomain: "video-logger-6585d.firebaseapp.com",
    projectId: "video-logger-6585d",
    storageBucket: "video-logger-6585d.appspot.com",
    messagingSenderId: "773500191124",
    appId: "1:773500191124:web:bef7073308a20bac1dcf81",
    measurementId: "G-G8M339H131"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);

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
  apiKey: "AIzaSyC-T_aOKHU74kFg8EZ19YfYok3ChFCP4_k",
  authDomain: "video-logger-66b46.firebaseapp.com",
  projectId: "video-logger-66b46",
  storageBucket: "video-logger-66b46.appspot.com",
  messagingSenderId: "1028298676520",
  appId: "1:1028298676520:web:8b3e240c800e834e1c981d",
  measurementId: "G-V5K5SD8DK9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);

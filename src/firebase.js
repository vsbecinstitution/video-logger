import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from "firebase/database"
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ2q4Xzbo_DjEJWxZgLBC9bnwR5Jxup7U",
  authDomain: "vsbec-communication-video.firebaseapp.com",
  databaseURL: "https://vsbec-communication-video-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vsbec-communication-video",
  storageBucket: "vsbec-communication-video.appspot.com",
  messagingSenderId: "822584761631",
  appId: "1:822584761631:web:41990e9bfba910c195642a",
  measurementId: "G-PM0K9G1JPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCw4Ss5jkVufOA9f4ayJJmavDQ4TnMwkVw",
  authDomain: "boilernotes-61e36.firebaseapp.com",
  databaseURL: "https://boilernotes-61e36-default-rtdb.firebaseio.com",
  projectId: "boilernotes-61e36",
  storageBucket: "boilernotes-61e36.appspot.com",
  messagingSenderId: "4786131586",
  appId: "1:4786131586:web:7dd25e336ba5c2725f9a9b",
  measurementId: "G-L03ZVSMW9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
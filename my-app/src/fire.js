import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCw4Ss5jkVufOA9f4ayJJmavDQ4TnMwkVw",
    authDomain: "boilernotes-61e36.firebaseapp.com",
    projectId: "boilernotes-61e36",
    storageBucket: "boilernotes-61e36.appspot.com",
    messagingSenderId: "4786131586",
    appId: "1:4786131586:web:7dd25e336ba5c2725f9a9b",
    measurementId: "G-L03ZVSMW9Y"
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;


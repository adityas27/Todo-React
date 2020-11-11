import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAYzNTLQAn8CjEvUloLWd_n_woqfgL1ydI",
    authDomain: "todolistapp-c1f3c.firebaseapp.com",
    databaseURL: "https://todolistapp-c1f3c.firebaseio.com",
    projectId: "todolistapp-c1f3c",
    storageBucket: "todolistapp-c1f3c.appspot.com",
    messagingSenderId: "19775947326",
    appId: "1:19775947326:web:5acb5d144cc97276d1076f",
    measurementId: "G-GPPQW9KMEH"
   });

const db = firebaseApp.firestore();

export default db;
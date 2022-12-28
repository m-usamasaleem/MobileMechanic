import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCLoMYsl_cIzkk1GMDug2-BvLnrQaweVv8",
    authDomain: "reactnative-firebase-573e3.firebaseapp.com",
    databaseURL: "https://reactnative-firebase-573e3-default-rtdb.firebaseio.com",
    projectId: "reactnative-firebase-573e3",
    storageBucket: "reactnative-firebase-573e3.appspot.com",
    messagingSenderId: "779873832065",
    appId: "1:779873832065:web:2967c2fdf028a82fad9180",
    measurementId: "G-FVDZS0Z72Y"
};
console.log('Trying to Connect with Firebase ...');
const Firebase = firebase.initializeApp(firebaseConfig);
console.log('Successfully Established Connection with Firebase!!');

// console.log('Logging From firebaseInit => THIS IS THE DATA FIREBASE SENT:', firebase);

export default Firebase

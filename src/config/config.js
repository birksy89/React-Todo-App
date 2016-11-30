//Add Firebase
import * as firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBlHsD1ST6aJAVrIGh2MYob9GXBUtAS1Jc",
    authDomain: "fir-todo-4a1ee.firebaseapp.com",
    databaseURL: "https://fir-todo-4a1ee.firebaseio.com",
    storageBucket: "fir-todo-4a1ee.appspot.com",
    messagingSenderId: "887843071656"
};
firebase.initializeApp(config);

// Get a reference to the database service
export var database = firebase.database();

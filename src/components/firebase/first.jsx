import React from 'react'

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
var database = firebase.database();

class FirebaseFirst extends React.Component {

    constructor() {
        super()
        this.state = {
            speed: 10
        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref()
        const speedRef = rootRef.child('speed');

        speedRef.on('value', snap => {
            this.setState({speed: snap.val()})
        })

        //Looking For Other Node Where Data is Being Pushed to
        const usersRef = rootRef.child('users');
        usersRef.on('value', snap => {
          this.setState({users: snap.val()})
        })
    }

    handleButtonClick() {
        console.log("Hello");
        this.writeUserData("2","2","3", "4")
    }

    writeUserData(userId, name, email, imageUrl) {
        database.ref('users/' + userId).set({username: name, email: email, profile_picture: imageUrl});
    }

    render() {
        return (
            <div>
                <h4>{this.state.speed}</h4>
                <h4>{JSON.stringify(this.state.users)}</h4>
                <button onClick={this.handleButtonClick.bind(this)}>Push Data</button>
            </div>

        )
    }

}

export default FirebaseFirst;

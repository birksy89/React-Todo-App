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
    }

    render() {
        return (
            <h4>{this.state.speed}</h4>
        )
    }

}

export default FirebaseFirst;

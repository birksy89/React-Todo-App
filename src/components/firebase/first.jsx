import React from 'react'

import * as Config from '../../config/config';
var database = Config.database;


class FirebaseFirst extends React.Component {

    constructor() {
        super()
        this.state = {
            speed: 10
        }
    }

    componentDidMount() {
        const rootRef = database.ref()
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

        this.writeUserData("6","Y","Z", "A")
    }

    writeUserData(userId, name, email, imageUrl) {
        database.ref('users/' + userId).set({username: name, email: email, profile_picture: imageUrl});
    }

    render() {
        return (
            <div>
              <h2>Firebase Testing</h2>
                <h4>Speed: {this.state.speed}</h4>
                <h4>{JSON.stringify(this.state.users)}</h4>
                <button onClick={this.handleButtonClick.bind(this)}>Push Data</button>
            </div>

        )
    }

}

export default FirebaseFirst;

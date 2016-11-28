import React, {Component} from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0
        };
    }

    addSecond() {
      //console.log(this);
        this.setState((prevState) => ({
            secondsElapsed: prevState.secondsElapsed + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.addSecond(), 1000);
        //this.custom = "WTF"
    }

    componentWillUnmount() {
   clearInterval(this.interval);
 }

    render() {
        return (
            <div>
                <p>You have been here for {this.state.secondsElapsed} seconds</p>
                <button onClick={this.addSecond.bind(this)}>Add Second</button>
            </div>
        );
    }
}

export default Counter;

import React, {Component} from 'react';
import './App.css';
//custom
import Counter from './components/counter/counter';
import TodoWrapper from './components/todo/todo-wrapper';
//Firebase Attempt
import FirebaseFirst from './components/firebase/first';

class App extends Component {
    render() {
        return (
            <div className="container">
                <TodoWrapper/>
                  <br/>
                  <hr/>
                  <FirebaseFirst/>
                <br/>
                <hr/>
                <Counter/>
            </div>
        );
    }
}

export default App;

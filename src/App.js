import React, {Component} from 'react';
import './App.css';
//custom
import Counter from './components/counter/counter';
import TodoWrapper from './components/todo/todo-wrapper';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TodoWrapper/>
                <br/>
                <hr/>
                <Counter/>
            </div>
        );
    }
}

export default App;

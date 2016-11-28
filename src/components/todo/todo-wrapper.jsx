import React, {Component} from 'react';
import uuid from 'uuid';

class TodoWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: uuid(),
                    value: 'This',
                    done: false
                }, {
                    id: uuid(),
                    value: 'That',
                    done: false
                }
            ]
        };
    }
    componentDidMount() {}

    pushNewItem(newItem) {
        //console.log("Pushing an item called: " + newItem);

        //Create new Object
        var tempItem = {
          id: uuid(),
          value: newItem,
          done:false
        }

        //Store the current array of objects
        var temp = this.state.todos;

        //Push the new object into the array
        temp.push(tempItem);

        //Set the state to the new array
        this.setState({todos: temp})

    }

    removeItem(removeMe){

console.log(removeMe);

      // var temp = this.state.todos;
      // console.log(temp);
      // temp.pop();
      //
      // this.setState({
      //   todos: temp
      // })

    }


    render() {

        var todoItems = this.state.todos.map(function(item) {
            return (<TodoItem item={item} key={item.id} removeItem={this.removeItem.bind(this)}/>)
        }, this)

        return (
            <div>
                <ul>
                    {todoItems}
                </ul>



                <AddTodoItem addItem={this.pushNewItem.bind(this)}/>
            </div>
        );
    }
}

class TodoItem extends Component {

    removeTodo(){
      this.props.removeItem(this.props.item.id);
    }

    render() {
        return (
            <li>{this.props.item.value}
                <span onClick={this.removeTodo.bind(this)}>x</span>
            </li>
        )
    }
}

class AddTodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newItem: 'New Item'
        };
    }

    handleInputChange(e) {
        e.preventDefault();
        console.log(e.target.value);

        var newVal = e.target.value;

        this.setState({newItem: newVal})
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = this.state.newItem;
        // console.log(newItem);
        this.props.addItem(newItem);
        this.setState({newItem: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input value={this.state.newItem} onChange={this.handleInputChange.bind(this)} type="text"></input>
            </form>
        )
    }
}

export default TodoWrapper;

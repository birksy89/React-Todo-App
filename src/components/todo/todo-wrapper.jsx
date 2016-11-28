import React, {Component} from 'react';
import uuid from 'uuid';
//Add Bootstrap Components
import { Button,ListGroup, ListGroupItem, FormControl } from 'react-bootstrap';

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

       var temp = this.state.todos;

       var filtered = temp.filter(function(el){
         if(el.id !== removeMe){
           return el
         }
         else{
           return false;
         }
       })

       console.log(filtered);

      this.setState({
        todos: filtered
      })

    }


    render() {

        var todoItems = this.state.todos.map(function(item) {
            return (<TodoItem item={item} key={item.id} removeItem={this.removeItem.bind(this)}/>)
        }, this)

        return (
            <div>
              <h2>To do List</h2>
              <ListGroup>
                    {todoItems}
                </ListGroup>



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
            <ListGroupItem>{this.props.item.value}

                 <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={this.removeTodo.bind(this)}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></Button>
            </ListGroupItem>
        )
    }
}

class AddTodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newItem: ''
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

                  <FormControl value={this.state.newItem} onChange={this.handleInputChange.bind(this)} type="text" placeholder="Enter text"/>
            </form>
        )
    }
}

export default TodoWrapper;

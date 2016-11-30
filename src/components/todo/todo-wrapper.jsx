import React, {Component} from 'react';
import uuid from 'uuid';
//Add Bootstrap Components
import {
    Button,
    Checkbox,
    ListGroup,
    ListGroupItem,
    Form,
    FormGroup,
    FormControl,
    InputGroup
} from 'react-bootstrap';


import * as Config from '../../config/config';
var database = Config.database;
const rootRef = database.ref()
const todosRef = rootRef.child('todos');

class TodoWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                // {
                //     id: uuid(),
                //     value: 'Loading...',
                //     done: false
                // }
            ]
        };
    }
    componentDidMount() {


      todosRef.on('value', snap => {
          this.setState({todos: Object.values(snap.val())})
      })
    }

    pushNewItem(newItem) {
        //console.log("Pushing an item called: " + newItem);

        //Create new Object
        var tempItem = {
            id: uuid(),
            value: newItem,
            done: false
        }

        //Store the current array of objects
        var temp = this.state.todos;

        //Push the new object into the array
        temp.push(tempItem);

          database.ref('todos/' + tempItem.id).set(tempItem);

        //Set the state to the new array
        this.setState({todos: temp})

    }

    removeItem(removeMe) {

        //console.log(removeMe);

        var temp = this.state.todos;

        var filtered = temp.filter(function(el) {
            if (el.id !== removeMe) {
                return el
            } else {

              //Remove Firebase Record
              var todoItemRef = todosRef.child(el.id);
              todoItemRef.remove()

                return false;
            }
        })

        //console.log(filtered);

        this.setState({todos: filtered})

    }

    editItem(editMeID, newValue) {
        //console.log(editMeID + " : " + newValue);
        var temp = this.state.todos;

        //console.log(temp);
        for (var i = 0; i < temp.length; i++) {
            //console.log(temp[i].id);
            if (temp[i].id === editMeID) {
                //console.log(temp[i]);
                //console.log("Found it!");
                temp[i].value = newValue

                //Update Firebase Record
                var todoItemRef = todosRef.child(editMeID);
                todoItemRef.update({
                  "value": newValue
                })

            }

        }

        this.setState({
          todos: temp
        })

    }

    toggleItemDone(doneID) {
        //console.log(doneID);

        var temp = this.state.todos;

        //console.log(temp);
        for (var i = 0; i < temp.length; i++) {
            //console.log(temp[i].id);
            if (temp[i].id === doneID) {
                //console.log(temp[i]);
                var newDoneState = !temp[i].done
                temp[i].done = newDoneState

                //Update Firebase Record
                var todoItemRef = todosRef.child(doneID);
                todoItemRef.update({
                  "done": newDoneState
                })
            }

        }

        //console.log(temp);

        this.setState({
          todos: temp
        })
    }

    render() {

        var todoItems = this.state.todos.map(function(item) {
            return (<TodoItem item={item} key={item.id} removeItem={this.removeItem.bind(this)} editItem={this.editItem.bind(this)} toggleItemDone={this.toggleItemDone.bind(this)}/>)
        }, this)

        return (
            <div>
                <h1>To Do List</h1>
                <ListGroup>
                    {todoItems}
                </ListGroup>

                <AddTodoItem addItem={this.pushNewItem.bind(this)}/>
            </div>
        );
    }
}

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        }
    }

    componentDidMount() {}

    removeTodo() {
        this.props.removeItem(this.props.item.id);
    }

    //Edit Stuff

    editMode() {
        this.setState({editMode: true});
    }

    //Save New Value when lose focus
    saveEdit(e) {
        var newVal = e.target.value;
        // console.log(e.target.value);
        //this.setState({editMode: false});
        this.props.editItem(this.props.item.id, newVal);

    }

    //Save new Value when you press Enter
    submitEdit(e) {
        e.preventDefault()
        this.setState({editMode: false});
    }

    toggleDone() {
        //  console.log("Done?");
        //  console.log(this.props.item);
        this.props.toggleItemDone(this.props.item.id);
    }

    renderTaskState() {

        if (this.props.item.done === false) {
            return (
                <span>{this.props.item.value}</span>
            )
        } else {
            return (
              <span><s>{this.props.item.value}</s></span>

            )
        }

    }

    render() {

        var renderThis;

        if (this.state.editMode === false) {

            renderThis = <ListGroupItem>

                <Checkbox inline onChange={this.toggleDone.bind(this)}>

                    {this.renderTaskState()}

                </Checkbox>

                <Button className="pull-right" bsStyle="danger" bsSize="xsmall" onClick={this.removeTodo.bind(this)}>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </Button>
                <Button className="pull-right" bsStyle="warning" bsSize="xsmall" onClick={this.editMode.bind(this)}>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                </Button>
            </ListGroupItem>

        } else {

            renderThis = <ListGroupItem>
                <Form onSubmit={this.submitEdit.bind(this)}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl autoFocus ref="editInput" defaultValue={this.props.item.value} onChange={this.saveEdit.bind(this)} type="text"/>

                            <InputGroup.Addon>
                                <Button bsStyle="success" bsSize="xsmall" onClick={this.submitEdit.bind(this)}>
                                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                </Button>
                            </InputGroup.Addon>

                        </InputGroup>
                    </FormGroup>
                </Form>

            </ListGroupItem>

        }

        return (
            <div>
                {renderThis}
            </div>
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
        //console.log(e.target.value);

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

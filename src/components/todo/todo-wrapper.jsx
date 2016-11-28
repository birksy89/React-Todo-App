import React, {Component} from 'react';

class TodoWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: ['This', 'That']
        };
    }
    componentDidMount() {

    }

    pushNewItem(newItem){
      //console.log("Pushing an item called: " + newItem);
      var temp = this.state.todos;
      temp.push(newItem);

      this.setState({
        todos: temp
      })

    }

    render() {

        var todoItems = this.state.todos.map(function(item) {
            return (<TodoItem item={item} key={item}/>)
        })

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
    render() {
        return (
            <li>{this.props.item} <span>X</span></li>
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

    handleInputChange(e){
        e.preventDefault();
        //console.log(e.target.value);

        var newVal = e.target.value;

        this.setState({
          newItem: newVal
        })
    }

    handleSubmit(e){
      e.preventDefault();
      var newItem = this.state.newItem;
      // console.log(newItem);
      this.props.addItem(newItem);
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

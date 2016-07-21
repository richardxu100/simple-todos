import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import TaskContainer from '../containers/TaskContainer.jsx';
import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';

// App component - represents the whole app
class App extends Component {
 	
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false
    };
  }

 	handleSubmit = (event) => { //don't need to .bind(this) if you use es7's babel-preset-stage-0
		event.preventDefault();

		//find the text field via the React ref
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 		
 		Meteor.call('tasks.insert', text);

 		//clear form
 		ReactDOM.findDOMNode(this.refs.textInput).value = '';
 	}
  
  toggleHideCompleted = () => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked); // will only return the values when task.checked is falsey, including false and undefined (items never clicked on)!
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
      console.log(this.props.currentUser);
      return (
        <TaskContainer 
          key={task._id} 
          task={task}
          showPrivateButton={showPrivateButton}
       />
      )
    });
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1> {/* This is a comment */}
          
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>
          
          <AccountsUIWrapper />
          
          { this.props.currentUser ? //currentUser is Meteor.user(), which checks if someone is logged in
            <form className="new-task" onSubmit={this.handleSubmit}>
  						<input 
  							type="text"
  							ref="textInput"
  							placeholder="Type here to add more todos"
  						/>
  					</form> : ''
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
	tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  Meteor.subscribe('tasks');
	
  return {
		tasks: Tasks.find({}, { sort: { createdAt: -1} }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(), // $ne is not equals, which is better than checked: false, because $ne also includes null, undefined, things not equal to true that otherwise would haven't been counted
    currentUser: Meteor.user(), 
	};
  // tasks are given to the App component as props here
}, App);
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Task from './Task.js';
import { Tasks } from '../api/tasks.js';
 
// App component - represents the whole app
class App extends Component {
 	
 	handleSubmit = (event) => { //don't need to .bind(this) if you use es7's babel-preset-stage-0
		event.preventDefault();

		//find the text field via the React ref
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 		
 		Tasks.insert({
 			text,
 			createdAt: new Date(),
 		});

 		//clear form
 		ReactDOM.findDOMNode(this.refs.textInput).value = '';
 	}

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1> {/* This is a comment */}
          
          <form className="new-task" onSubmit={this.handleSubmit}>
						<input 
							type="text"
							ref="textInput"
							placeholder="Type here to add more todos"
						/>
					</form>
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
};

export default createContainer(() => {
	return {
		tasks: Tasks.find({}, { sort: { createdAt: -1} }).fetch(),
	};
}, App);
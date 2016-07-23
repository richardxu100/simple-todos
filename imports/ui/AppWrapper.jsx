import React, { PropTypes, Component } from 'react';
import TaskContainer from '../containers/TaskContainer.jsx';
import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';
import Input from './input.js';

// App component - represents the whole app
export default class AppWrapper extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1> {/* This is a comment */}
          
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.props.hideCompleted}
              onClick={this.props.toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.props.currentUser ? // currentUser is Meteor.user(), which checks if someone is logged in
            <form 
              className="new-task" 
              onSubmit={this.props.handleSubmit}
              ref={r => this._form = r}
            >
              <Input name="textInput"/>
            </form>
             : '' 
          }
        </header>

        <ul>
          {this.props.renderTasks}
        </ul>
      </div>
    );
  }
}
import React, { Component } from 'react';
import Task from '../ui/task.js';
import { Tasks } from '../api/tasks.js';
// import Meteor from 'meteor/meteor';

export default class TaskContainer extends Component {
	
	toggleChecked = () => {
		Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
	}
	
	deleteThisTask = () => {
		Meteor.call('tasks.remove', this.props.task._id);
	}

	togglePrivate = () => {
		// console.log('toggle Private works!');
		Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
	}

	render() {
		return (
			<Task 
				task={this.props.task}
				deleteThisTask={this.deleteThisTask}
				toggleChecked={this.toggleChecked}
				togglePrivate={this.togglePrivate}
				showPrivateButton={this.props.showPrivateButton}
			/>
		)
	}
}

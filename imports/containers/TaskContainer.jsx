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
		Meteor.call('setPrivate', this.props.task._id, !this.props.task.private);
	}

	render() {
		return (
			<Task 
				task={this.props.task}
				deleteThisTask={this.deleteThisTask}
				toggleChecked={this.toggleChecked}
				showPrivateButton={this.props.showPrivateButton}
			/>
		)
	}
}
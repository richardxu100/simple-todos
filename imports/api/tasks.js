import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
	// only publish tasks that are public or belong to the user
	Meteor.publish('tasks', function tasksPublication() { // creates a publication called tasks, which has all of the tasks in the Task collection
		return Tasks.find({
			$or: [ // return tasks that are either not private or owned by the user
				{ private: { $ne: true } },
				{ owner: this.userId }
			]
		});
	});
}

Meteor.methods({
	'tasks.insert'(text) {
		check(text, String);
		
		console.log(this.userId);

		//check if the user is logged in			
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.insert({
			text,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username
		});
	},
	'tasks.remove'(taskId) {
		check(taskId, String);

		Tasks.remove(taskId);
	},
	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);

		Tasks.update(taskId, { $set: { checked: setChecked } });
	},
	'tasks.setPrivate'(taskId, setToPrivate) {
		check(taskId, String);
		check(setToPrivate, Boolean);

		const task = Tasks.findOne(taskId);

		// Make sure only the task owner can set this task to private
		if (task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.update(taskId, { $set: { private: setToPrivate } });
	}
});
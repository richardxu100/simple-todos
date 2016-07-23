import React, { PropTypes } from 'react';
import classnames from 'classnames';
// import Meteor from 'meteor/meteor'; /??when to do this command
// Task component - represents a single todo item
// Functional stateless component
const Task = (props) => {
	
	// allows for different styling to appear on the List element if the item's checked off
	const taskClassName = classnames({
		checked: props.task.checked,
		private: props.task.private
	});

	return (
		<li className={taskClassName}> {/* allows one item to have multiple class attributes with one class name */}

			<button 
				className="delete" 
				onClick={props.deleteThisTask}>
				&times;
			</button>

			<input 
				type="checkbox"
				readOnly
				checked={props.task.checked}
				onClick={props.toggleChecked}
			/>

			{ props.showPrivateButton ? (
				<button className="toggle-private" onClick={props.togglePrivate}>
					{ props.task.private ? 'Private' : 'Public' }
				</button> 
			) : '' }

			<span className="text">
				<strong>{props.task.username}</strong>	{props.task.text}
			</span>
		</li>
	)
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: PropTypes.bool.isRequired,
  deleteThisTask: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
  togglePrivate: PropTypes.func.isRequired
};

export default Task;
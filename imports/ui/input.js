import React, { PropTypes } from 'react';

const Input = (props) => {
	return (
		<input 
			type="text"
			name={props.name}
			placeholder="Type here to add more todos"
		/>
	)	
}

export default Input;
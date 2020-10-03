import React from 'react';
import { Box, Button, Checkbox, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ACTIONS } from '../pages/Todo';

const styles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1)
	}
}));

const TodoList = ({ dispatch, handleChange, id, name, completed }) => {
	console.log(completed, 'completed');
	const classes = styles();
	return (
		<div>
			<Box component='span' display='block' p={1} m={1} bgcolor='#EDF9FB' color='#2E5170' border='1px solid #E7ECEC'>
				<Checkbox
					checked={completed}
					style={{ color: 'green' }}
					inputProps={{ 'aria-label': 'secondary checkbox' }}
					onChange={handleChange}
					onClick={() => dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id } })}
				/>

				<span
					style={{
						color: completed ? '#807E7E' : '#000000',
						textDecoration: completed ? 'line-through' : 'none'
					}}
				>
					{name}
				</span>

				<IconButton
					style={{ float: 'right', color: '#D94042' }}
					aria-label='delete'
					className={classes.margin}
					onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } })}
				>
					<DeleteIcon />
				</IconButton>
			</Box>
		</div>
	);
};

export default TodoList;

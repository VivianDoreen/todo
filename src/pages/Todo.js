import React, { useState, useReducer } from 'react';

import { Box, Card, CardContent, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TodoList from '../components/TodoList.js';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		maxWidth: 650,
		margin: '10% auto'
	},

	textStyle: {
		'& > *': {
			margin: theme.spacing(0),
			width: '46ch'
		}
	},

	title: {
		fontSize: 14
	}

}));

export const ACTIONS = {
	ADD_TODO: 'add todo',
	COMPLETE_TODO: 'complete todo',
	DELETE_TODO: 'delete todo'
};

const reducer = (todos, action) => {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [ ...todos, addTodo(action.payload.name, action.payload.checked) ];

		case ACTIONS.COMPLETE_TODO:
			return todos.map((todo) => {
				console.log(todo.completed, 'todo.completed');
				if (todo.id === action.payload.id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			});

		case ACTIONS.DELETE_TODO:
			return todos.filter((todo) => todo.id !== action.payload.id);

		default:
			return todos;
	}
};

const addTodo = (name, checked) => {
	return {
		id: new Date(),
		name,
		completed: checked
	};
};
const Todo = () => {
	const [ checked, setChecked ] = useState(false);
	const [ todos, dispatch ] = useReducer(reducer, []);
	const [ name, setName ] = useState('');

	const classes = useStyles();
	const height = 34;

	const handleChange = (e) => {
		const { checked } = e.target;
		setChecked(checked);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ type: ACTIONS.ADD_TODO, payload: { name, checked } });
		setName('');
	};

	console.log(todos, 'todostodostodos');

	return (
		<Card className={classes.root}>
			<CardContent>
				<Box component='span' display='block' p={1} m={1} bgcolor='#F5F4F6' color='#2E5170'>
					<Typography variant='h5' component='h1' style={{ width: '19%', margin: '0 auto', fontWeight: 'bold' }}>
						<span>toDo list</span>
					</Typography>
				</Box>
				<Box component='span' display='block' p={1} m={1} bgcolor='#F5F4F6' color='#2E5170'>
					<form onSubmit={handleSubmit} className={classes.textStyle}>
						<TextField
							className='textInput'
							id='outlined-basic'
							variant='outlined'
							value={name}
							onChange={(e) => setName(e.target.value)}
							style={{ height }}
							InputLabelProps={{
								style: {
									height
								}
							}}
							inputProps={{
								style: {
									height,
									padding: '0 14px'
								}
							}}
						/>
						<Button
							type='submit'
							variant='contained'
							style={{
								width: '110px',
								fontWeight: 'bolder',
								marginLeft: 10,
								backgroundColor: '#3073AB',
								color: '#ffffff'
							}}
						>
							Add todo
						</Button>
					</form>
				</Box>
				<Box>
					{todos.length !== 0 &&
						todos.map((todo) => (
							<TodoList key={todo.id} checked={checked} handleChange={handleChange} {...todo} dispatch={dispatch} />
						))}
				</Box>
			</CardContent>
		</Card>
	);
};

export default Todo;

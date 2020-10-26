import React, { useState, useReducer } from 'react';

import { Box, Card, CardContent, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TodoList from '../components/TodoList';

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

interface Todo{
	id: Date,
	name:string,
	completed: boolean
}

type State=Todo[]

type Action = |{type:'add todo', payload:{name:string, completed:boolean}}
|{type:'complete todo', payload:{id:Date}}|{type:'delete todo', payload:{id:Date}}

const reducer = (todos:State, action:Action) => {
	switch (action.type) {
		case 'add todo':
			return [ ...todos, addTodo(action.payload.name, action.payload.completed) ];

		case 'complete todo':
			return todos.map((todo) => {
				console.log(todo.completed, 'todo.completed');
				if (todo.id === action.payload.id) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			});

		case 'delete todo':
			return todos.filter((todo) => todo.id !== action.payload.id);

		default:
			return todos;
	}
};

const addTodo = (name:string, checked:boolean) => {
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

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;
		setChecked(checked);
	};

	const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({ type:'add todo', payload: { name, completed:checked } });
		setName('');
	};

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
						todos.map((todo, index) => (
							<TodoList key={index} handleChange={handleChange} {...todo} dispatch={dispatch} />
						))}
				</Box>
			</CardContent>
		</Card>
	);
};

export default Todo;

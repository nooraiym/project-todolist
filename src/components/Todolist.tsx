import { ChangeEvent } from 'react';
import { FilterValuesType } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles'
import Toolbar from '@mui/material/Toolbar';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  todolistID: string
  title: string
  tasks: Array<TaskType>
  removeTodolist: (todolistId: string) => void
  updateTodolist: (todolistID: string, title: string) => void
  removeTask: (todolistID: string, id: string) => void
  functionForButton: (todolistID:string, value: FilterValuesType ) => void
  addTask: (todolistID: string, title: string) => void
  updateTask:  (todolistID: string, taskId: string, title: string) => void
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

  // functions for events
  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID)
  }
  const updateTodolistHandler = (title: string) => {
    props.updateTodolist(props.todolistID, title)
  }

  const onAllClickHandler = () => props.functionForButton(props.todolistID, "all");
  const onActiveClickHandler = () => props.functionForButton(props.todolistID, "active");
  const onCompletedClickHandler = () => props.functionForButton(props.todolistID, "completed");

  const addTask = (title: string) => {
    props.addTask(props.todolistID, title)
  }

  return (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <EditableSpan value={props.title} onChange={updateTodolistHandler} />
        <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Toolbar>
      
      <AddItemForm addItem={addTask} />
      
      <List>
        {props.tasks.map( t => {
          const removeTaskHandler = () => props.removeTask(props.todolistID, t.id);
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked )
          }
          const changeTaskTitleHandler = (title:string) => {
            props.updateTask(props.todolistID, t.id, title)
          }

          return (
          <ListItem 
            key={t.id} 
            sx={getListItemSx(t.isDone)}
            >
            <div>
              <Checkbox 
                onChange={changeStatusHandler} 
                checked={t.isDone} />
              <EditableSpan 
                value={t.title} 
                onChange={changeTaskTitleHandler}/>
            </div>
            <Button 
              onClick={removeTaskHandler} 
              title={'x'} />
            <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </ListItem>
        )})}
      </List>
      <Box
        sx={filterButtonsContainerSx}>
        <Button 
          variant={props.filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'} 
          onClick={onAllClickHandler} >
            All
        </Button>
        <Button 
          variant={props.filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={onActiveClickHandler} >
            Active
        </Button>
        <Button 
          variant={props.filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={onCompletedClickHandler} >
            Completed
        </Button>
      </Box>
    </div>
  );
}



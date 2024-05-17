import React from 'react';
import { useCallback } from 'react';
import { AddItemForm } from '../AddItemForm';
import { EditableSpan } from '../EditableSpan';
import { Task } from '../Task';
import { FilterValuesType } from '../../AppWithRedux';

import { filterButtonsContainerSx } from './Todolist.styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import { addTaskAC} from '../../state/tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../../state/todolist-reducer';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  todolistID: string
  title: string
  filter: FilterValuesType
}

export const Todolist = React.memo(({ todolistID, title, filter}: TodolistPropsType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistID]);

  // functions for events
  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(title, todolistID))
  }, [todolistID]);
  const removeTodolistHandler = useCallback(() => {
    dispatch(removeTodolistAC(todolistID))
  }, [todolistID]);
  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTodolistTitleAC(todolistID, title))
  }, [todolistID])
  const functionForButton = useCallback((todolistID:string, newFilter: FilterValuesType) => {
  dispatch(changeTodolistFilterAC(todolistID, newFilter))
  }, [todolistID])

  const onAllClickHandler = useCallback(() => functionForButton(todolistID, "all"), [todolistID]);
  const onActiveClickHandler = useCallback(() => functionForButton(todolistID, "active"), [todolistID]);
  const onCompletedClickHandler = useCallback(() => functionForButton(todolistID, "completed"), [todolistID]);

  let filteredTasks = tasks;
  if ( filter === "completed") {
    filteredTasks = filteredTasks.filter( t => t.isDone === true)
  }
  if ( filter === "active") {
    filteredTasks = filteredTasks.filter( t => t.isDone === false)
  }

  return (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Toolbar>
      
      <AddItemForm addItem={addTask} />
      
      <List>
        {filteredTasks.map( t => { return <Task key={t.id} todolistID={todolistID} task={t} /> })}
      </List>
      <Box
        sx={filterButtonsContainerSx}>
        <Button 
          variant={filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'} 
          onClick={onAllClickHandler} >
            All
        </Button>
        <Button 
          variant={filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={onActiveClickHandler} >
            Active
        </Button>
        <Button 
          variant={filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={onCompletedClickHandler} >
            Completed
        </Button>
      </Box>
    </div>
  );
})
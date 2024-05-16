import { ChangeEvent } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../state/tasks-reducer';
import { FilterValuesType } from '../AppWithRedux';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../state/todolist-reducer';

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

export function Todolist({
  todolistID,
  title,
  filter
}: TodolistPropsType) {

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistID]);


  // functions for events
  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(todolistID))
}

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC(todolistID, title))
  }

  const functionForButton = (todolistID:string, newFilter: FilterValuesType) => {
  dispatch(changeTodolistFilterAC(todolistID, newFilter))
  }

  const onAllClickHandler = () => functionForButton(todolistID, "all");
  const onActiveClickHandler = () => functionForButton(todolistID, "active");
  const onCompletedClickHandler = () => functionForButton(todolistID, "completed");

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
      
      <AddItemForm addItem={(title) => dispatch(addTaskAC(title, todolistID))} />
      
      <List>
        {filteredTasks.map( t => {
          const removeTaskHandler = () => dispatch(removeTaskAC(t.id, todolistID));
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newStatus = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newStatus, todolistID))
          }
          const changeTaskTitleHandler = (title:string) => {
            dispatch(changeTaskTitleAC(t.id, title, todolistID))
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
            <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </ListItem>
        )})}
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
}



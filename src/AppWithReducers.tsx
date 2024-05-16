import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './components/AddItemForm';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuButton } from './components/MenuButton';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from './state/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { TaskType, Todolist } from './components/Todolist';

// types
type ThemeMode = 'dark' | 'light'
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithReducers() {
  // data
  let [themeMode, setThemeMode] = useState<ThemeMode>('light')

  let todolistID1 = v1()
  let todolistID2 = v1()
  let [todolists, dispatchToTodolists] = useReducer(todolistReducer,[
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  // theme
  const theme = createTheme({
  palette: {
    mode: themeMode === 'light' ? 'light' : 'dark',
    primary: {
      main: '#1a4a87',
    },
    secondary: {
      main: '#527aba',
    },
    text: {
      primary: 'rgba(109, 109, 109, 0.87)',
      disabled: 'rgba(0,0,0,0.5)',
    },
  },
})

  // functions
  const changeModeHandler = () => {
    setThemeMode( themeMode === 'light' ? 'dark' : 'light')
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
      dispatchToTasks(action);
      dispatchToTodolists(action);
    }
  const removeTodolist = (todolistID:string) => {
    const action = removeTodolistAC(todolistID)
    dispatchToTasks(action)
    dispatchToTodolists(action)
  }
  const updateTodolist = (todolistID: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC(todolistID, title))
  }
  const changeFilter = (todolistID:string, newFilter: FilterValuesType) => {
    dispatchToTodolists(changeTodolistFilterAC(todolistID, newFilter))
  }

  const removeTask = (todolistID: string, taskId: string) => {
    dispatchToTasks(removeTaskAC(taskId, todolistID))
  }
  const addTask = (todolistID: string, title: string) => {
    dispatchToTasks(addTaskAC(title, todolistID))
  }
  const updateTask = (todolistID: string, taskId: string, title: string) => {
    dispatchToTasks(changeTaskTitleAC(taskId, title, todolistID))
  }
  const changeStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
    dispatchToTasks(changeTaskStatusAC(taskId, taskStatus, todolistID))
  }

// ui
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton background={theme.palette.primary.dark} >Login</MenuButton>
            <MenuButton background={theme.palette.primary.dark} >Logout</MenuButton>
            <MenuButton background='#3f89de' >Faq</MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>

      <Container fixed sx={{ padding: '0' }}>
        <Grid container sx={{ mb: '50px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4} sx={{ gap: '20px', flexWrap: 'wrap' }}>
          {todolists.map(el => {
            let filteredTasks = tasks[el.id];
            if ( el.filter === "completed") {
              filteredTasks = filteredTasks.filter( t => t.isDone === true)
            }
            if ( el.filter === "active") {
              filteredTasks = filteredTasks.filter( t => t.isDone === false)
            }

            return (
              <Grid key={el.id}>
                <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', p: '20px' }}>
                  {/* <Todolist
                    todolistID={el.id}
                    title={el.title} 
                    tasks={filteredTasks} 
                    removeTodolist={removeTodolist}
                    updateTodolist={updateTodolist}
                    removeTask={removeTask} 
                    functionForButton={changeFilter}
                    addTask={addTask}
                    updateTask={updateTask}
                    changeTaskStatus={changeStatus}
                    filter={el.filter}
                  /> */}
                </Paper>
              </Grid>
            )})}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AppWithReducers;




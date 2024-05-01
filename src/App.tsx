import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './components/Todolist';
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


function App() {
  // data
  let [themeMode, setThemeMode] = useState<ThemeMode>('light')
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])
  let [tasks, setTasks] = useState<TasksStateType>({
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
      main: '#93b1e2',
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
    const todolistId = v1()
      const newTodolist: TodolistType = { id: todolistId, title: title, filter: 'all' }
      setTodolists([newTodolist, ...todolists])
      setTasks({...tasks, [todolistId]: []})
    }
  const removeTodolist = (todolistID:string) => {
    const newTodolists = todolists.filter(tl => tl.id !== todolistID);
    setTodolists(newTodolists);
    delete tasks[todolistID];
    setTasks({ ...tasks });
  }
  const updateTodolist = (todolistID: string, title: string) => {
    const newTodolist = todolists.map(todo => todo.id === todolistID ? {...todo, title} : todo)
    setTodolists(newTodolist);
  }
  const changeFilter = (todolistID:string,newFilter: FilterValuesType) => {
    setTodolists(todolists.map(el => el.id === todolistID
      ? {...el, filter: newFilter}
      : el)
  )
  }
  const removeTask = (todolistID: string, taskId: string) => {
    setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el=>el.id!==taskId)})
  }
  const addTask = (todolistID: string, title: string) => {
    const newTask = {id: v1(), title: title, isDone: false}
    // setTasks((prevState)=>({...prevState, [todolistID]: [newTask,...prevState[todolistID]]}))
    setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
  }
  const updateTask = (todolistID: string, taskId: string, title: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistID]: tasks[todolistID].map(t => (t.id === taskId ? { ...t, title } : t)),
    }
    setTasks(newTodolistTasks)
  }
  const changeStatus = (todolistID: string,taskId: string, taskStatus: boolean) => {
    setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId ?{...el,isDone:taskStatus} :el)})
    // методом find
    // let task = tasks.find( t => t.id === taskId );
    // if (task) {
    //   task.isDone = taskStatus;
    // }
    // setTasks([...tasks]);

    // методом map
    // const newState = tasks.map( t => (t.id === taskId ? {...t, isDone: taskStatus} : t));
    // setTasks(newState);
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

      <Container fixed>
        <Grid container sx={{ mb: '30px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4}>
          {todolists.map(el => {
            let filteredTasks = tasks[el.id];
            if ( el.filter === "completed") {
              filteredTasks = filteredTasks.filter( t => t.isDone === true)
            }
            if ( el.filter === "active") {
              filteredTasks = filteredTasks.filter( t => t.isDone === false)
            }

            return (
              <Grid>
                <Paper sx={{ p: '0 20px 20px 20px' }}>
                  <Todolist 
                    key={el.id}
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
                  />
                </Paper>
              </Grid>
            )})}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;

import { useState } from 'react';
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

import { addTodolistAC} from './state/todolist-reducer';
import { useDispatch } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useSelector } from 'react-redux';


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


function AppWithRedux() {
  // theme
  let [themeMode, setThemeMode] = useState<ThemeMode>('light')  
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

  // data
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

  // functions
  const changeModeHandler = () => {
    setThemeMode( themeMode === 'light' ? 'dark' : 'light')
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
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
            return (
              <Grid key={el.id}>
                <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', p: '20px' }}>
                  <Todolist
                    todolistID={el.id}
                    title={el.title} 
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

export default AppWithRedux;
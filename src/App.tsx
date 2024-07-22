import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { AddItemForm } from './components/AddItemForm';
import Header from './components/Header';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';

import { addTodolistTC, fetchTodolistsTC, TodolistDomainType} from './middleware/todolist-reducer';
import { AppRootStateType } from './middleware/store';
import { TaskType } from './api/todolists-api';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { ErrorSnackbar } from './components/ErrorSnackbar';

// types
type ThemeMode = 'dark' | 'light'
export type FilterValuesType = "all" | "active" | "completed"
export type TasksStateType = { [key: string]: Array<TaskType> }


function App() {
  // data
  const dispatch = useAppDispatch();
  const todolists = useAppSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
  useEffect(() => dispatch(fetchTodolistsTC()), [])

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

  // functions
  const changeModeHandler = useCallback(() => setThemeMode( themeMode === 'light' ? 'dark' : 'light'), [])
  const addTodolist = useCallback((title: string) => dispatch(addTodolistTC(title)), [])

  const mappedTodolists = todolists.map(el => {
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
    )});

// ui
  return (
    <ThemeProvider theme={theme} >
      <ErrorSnackbar />
      <CssBaseline />
      <Header theme={theme} changeModeHandler={changeModeHandler} />

      <Container fixed sx={{ padding: '0' }}>
        <Grid container sx={{ mb: '50px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4} sx={{ gap: '20px', flexWrap: 'wrap' }}>
          { mappedTodolists }
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default React.memo(App);
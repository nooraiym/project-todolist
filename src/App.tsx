import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import { fetchTodolistsTC } from './middleware/todolist-reducer';
import { useAppDispatch } from './hooks/hooks';
import { ErrorSnackbar } from './components/ErrorSnackbar';
import { TodolistList } from './components/todolist/TodolistList';
import { Outlet } from 'react-router-dom';

// types
type ThemeMode = 'dark' | 'light'
type AppPropsType = { demo?: boolean }

function App( { demo = false }: AppPropsType) {
  // data
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (demo) return
    dispatch(fetchTodolistsTC())
  }, [])

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

// ui
  return (
    <ThemeProvider theme={theme} >
      <ErrorSnackbar />
      <CssBaseline />
      <Header theme={theme} changeModeHandler={changeModeHandler} />

      <Container fixed sx={{ padding: '0' }}>
        {/* <TodolistList demo={demo} /> */}
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default React.memo(App);
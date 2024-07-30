import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Header from 'components/Header'
import { ErrorSnackbar } from 'components/ErrorSnackbar'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import CircularProgress from '@mui/material/CircularProgress'

import { fetchTodolistsTC } from 'middleware/todolistSlice'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { Outlet } from 'react-router-dom'
import { selectIsInitialized, me } from 'middleware/appSlice'

// types
type ThemeMode = 'dark' | 'light'
type AppPropsType = { demo?: boolean }

function App({ demo = false }: AppPropsType) {
  // data
  const isInitialized = useAppSelector(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo) return
    dispatch(fetchTodolistsTC())
    dispatch(me())
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
  const changeModeHandler = useCallback(() => setThemeMode(themeMode === 'light' ? 'dark' : 'light'), [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  // ui
  return (
    <ThemeProvider theme={theme}>
      <ErrorSnackbar />
      <CssBaseline />
      <Header changeModeHandler={changeModeHandler} />

      <Container fixed sx={{ padding: '0' }}>
        {/* <TodolistList demo={demo} /> */}
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default React.memo(App)

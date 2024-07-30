import { MenuButton } from './MenuButton'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import Switch from '@mui/material/Switch'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { AppRootStateType } from 'middleware/store'
import { useCallback } from 'react'
import { logout } from 'middleware/auth-reducer'

type HeaderPropsType = {
  theme: any
  changeModeHandler: () => void
}

export const Header = ({ theme, changeModeHandler }: HeaderPropsType) => {
  const status = useAppSelector<AppRootStateType, string>(state => state.app.status)
  const isLoggedIn = useAppSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [])

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={handleLogout}>Logout</MenuButton>}
          <MenuButton background="#3f89de">Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}

export default Header

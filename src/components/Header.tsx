import React, { useCallback } from 'react';
import { MenuButton } from './MenuButton';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';
import { useAppSelector } from '../hooks/hooks';

type HeaderPropsType = {
  theme: any
  changeModeHandler: () => void
}

export const Header = ( {theme, changeModeHandler} : HeaderPropsType ) => {
  const status = useAppSelector(state => state.app.status)
  return (
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
    { status === 'loading' && <LinearProgress /> }
  </AppBar>
  );
};

export default Header;
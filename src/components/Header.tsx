import React, { useCallback } from 'react';
import { MenuButton } from './MenuButton';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';

type HeaderPropsType = {
  theme: any
  changeModeHandler: () => void
}

export const Header = ( {theme, changeModeHandler} : HeaderPropsType ) => {
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
  </AppBar>
  );
};

export default Header;
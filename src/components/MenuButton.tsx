import { styled } from '@mui/material/styles'
import { Button } from "@mui/material";

type MenuButtonProps = {
    background?: string
}

export const MenuButton = styled(Button)<MenuButtonProps> ( ({background, theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${theme.palette.secondary.light}`,
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.light,
    background: background || '#1565c0',
    backgroundColor: '#e2e2e2',
}))
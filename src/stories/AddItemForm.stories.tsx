import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { AddItemForm } from '../components/AddItemForm';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox'

const meta: Meta<typeof AddItemForm> = {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: { // определяют поведение аргументов (то, что есть у компоненты)
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};
export default meta;

type Story = StoryObj<typeof AddItemForm>;
export const Primary: Story = {
    args: { // props
        addItem: action('Button')
    },
};

export const Secondary = () => <AddItemForm addItem={action('Button clicked')} />

export const Warning: Story = {
    render: (args) => {
        const [newTaskTitle, setNewTaskTitle] = useState("");
        const [error, setError] = useState<string | null>("Title is required");
    
        const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTaskTitle(e.currentTarget.value);
        }
        const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(error !== null) {
                setError(null);
            }
            if( newTaskTitle !== '' && e.key === "Enter") {
                args.addItem(newTaskTitle);
                setNewTaskTitle("");
            }
        }
        const addTaskHandler = () => {
            if (newTaskTitle.trim() !== "") {
                args.addItem(newTaskTitle.trim());
                setNewTaskTitle ("")
            } else {
                setError("Title is required");
            }
        }
        return (
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <TextField 
                    label="Enter a title"
                    variant='outlined'
                    size='small'
                    error={!!error}
                    helperText={error}
                    value={newTaskTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler} 
                />
                <IconButton 
                    color='primary'
                    onClick={addTaskHandler}>
                        <AddBoxIcon />
                </IconButton>
            </Toolbar>
        )
    }
};
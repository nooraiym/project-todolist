import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import { ChangeEvent, KeyboardEvent, useState } from 'react';

    type AddItemFormPropsType ={
    addItem: (title: string) => void
    }

    export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if( newTaskTitle !== '' && e.ctrlKey && e.key === "Enter") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle ("")
        } else {
            setError("Title is required");
        }
    }


    return (
        <div>
            <TextField 
                label="Enter a title"
                variant={'outlined'}
                size={'small'}
                error={!!error}
                helperText={error}
                value={newTaskTitle} 
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyDownHandler} />
            <IconButton 
                color={'primary'}
                onClick={addTaskHandler}>
                    <AddBoxIcon />
            </IconButton>
        </div>
    )
    }

import TextField from "@mui/material/TextField"
import { ChangeEvent, useState } from "react"

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({ value, onChange }: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    
    const activateEditModeHandler = () => {
        setEditMode(!editMode)
    }
    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    
    return (
    <>
        {editMode ? (
        <TextField
            variant={'outlined'}
            size={'small'}
            value={title} 
            onChange={changeTitleHandler} 
            onBlur={deactivateEditModeHandler} 
            autoFocus  />
        ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
        )}
    </>
    )
}
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo(({ addItem, disabled = false }: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (newTaskTitle !== '' && e.key === 'Enter') {
      addItem(newTaskTitle)
      setNewTaskTitle('')
    }
  }

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        label="Enter a title"
        variant={'outlined'}
        size={'small'}
        error={!!error}
        helperText={error}
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
        disabled={disabled}
      />
      <IconButton color={'primary'} onClick={addTaskHandler} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </Toolbar>
  )
})

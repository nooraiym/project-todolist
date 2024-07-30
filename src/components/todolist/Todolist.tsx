import React from 'react'
import { useCallback } from 'react'
import { AddItemForm } from '../AddItemForm'
import { EditableSpan } from '../EditableSpan'
import { Task } from '../Task'

import { filterButtonsContainerSx } from './Todolist.styles'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import { DomainTaskType, FilterValuesType, TaskStatuses, TodolistDomainType } from 'api/todolists-api'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { AppRootStateType } from 'middleware/store'
import { addTaskTC } from 'middleware/tasksSlice'
import { changeTodolistFilter, changeTodolistTitleTC, removeTodolistTC } from 'middleware/todolistSlice'

type TodolistPropsType = {
  todolist: TodolistDomainType
  demo?: boolean
}

export const Todolist = React.memo(({ todolist, demo = false }: TodolistPropsType) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector<AppRootStateType, Array<DomainTaskType>>(state => state.tasks[todolist.id])

  // useEffect(() => {
  //   if (demo) {
  //     return
  //   }
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])

  // functions for events
  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC(todolist.id, title))
    },
    [todolist.id]
  )
  const removeTodolistHandler = useCallback(() => {
    dispatch(removeTodolistTC(todolist.id))
  }, [todolist.id])
  const changeTodolistTitle = useCallback(
    (title: string) => {
      dispatch(changeTodolistTitleTC(todolist.id, title))
    },
    [todolist.id]
  )
  const functionForButton = useCallback(
    (todolistID: string, newFilter: FilterValuesType) => {
      dispatch(changeTodolistFilter({ todoID: todolistID, filter: newFilter }))
    },
    [todolist.id]
  )

  const onAllClickHandler = useCallback(() => functionForButton(todolist.id, 'all'), [todolist.id])
  const onActiveClickHandler = useCallback(() => functionForButton(todolist.id, 'active'), [todolist.id])
  const onCompletedClickHandler = useCallback(() => functionForButton(todolist.id, 'completed'), [todolist.id])

  let filteredTasks = tasks
  if (todolist.filter === 'completed') {
    filteredTasks = filteredTasks.filter(t => t.status === TaskStatuses.Completed)
  }
  if (todolist.filter === 'active') {
    filteredTasks = filteredTasks.filter(t => t.status === TaskStatuses.New)
  }

  return (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
        <IconButton
          aria-label="delete"
          size="small"
          onClick={removeTodolistHandler}
          disabled={todolist.entityStatus === 'loading'}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Toolbar>

      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'} />

      <List>
        {filteredTasks.map(t => {
          return <Task key={t.id} todoID={todolist.id} task={t} />
        })}
      </List>
      <Box sx={filterButtonsContainerSx}>
        <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'} color={'inherit'} onClick={onAllClickHandler}>
          All
        </Button>
        <Button
          variant={todolist.filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </Box>
    </div>
  )
})

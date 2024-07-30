import { v1 } from 'uuid'
import { FilterValuesType, RequestStatusType, TodolistDomainType, TodolistType, todolistsAPI } from 'api/todolists-api'
import { AppDispatch, AppRootStateType, AppThunk } from './store'
import { fetchTasksTC } from './tasksSlice'
import { setAppStatus } from './appSlice'
import { AxiosError } from 'axios'
import { handleServerError, handleServerNetworkError } from 'utils/error-utils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export let todolistID1 = v1()
export let todolistID2 = v1()

export const slice = createSlice({
  name: 'todolists',
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    setTodolist: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      action.payload.todolists.forEach(todo => state.push({ ...todo, filter: 'all', entityStatus: 'idle' }))
    },
    clearTodolist: (state, action: PayloadAction<{}>) => {
      // return []
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    removeTodolist: (state, action: PayloadAction<{ todoID: string }>) => {
      const i = state.findIndex(todo => todo.id === action.payload.todoID)
      if (i !== -1) state.splice(i, 1)
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todoID: string; title: string }>) => {
      const i = state.findIndex(todo => todo.id === action.payload.todoID)
      if (i !== -1) state[i].title = action.payload.title
    },
    changeTodolistFilter: (state, action: PayloadAction<{ todoID: string; filter: FilterValuesType }>) => {
      const i = state.findIndex(todo => todo.id === action.payload.todoID)
      if (i !== -1) state[i].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ todoID: string; entityStatus: RequestStatusType }>) => {
      const i = state.findIndex(todo => todo.id === action.payload.todoID)
      if (i !== -1) state[i].entityStatus = action.payload.entityStatus
    },
  },
})

export const todolistReducer = slice.reducer
export const {
  setTodolist,
  clearTodolist,
  addTodolist,
  removeTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
} = slice.actions

export const fetchTodolistsTC = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodolist({ todolists: res.data }))
    dispatch(setAppStatus({ status: 'succeeded' }))

    res.data.map(el => dispatch(fetchTasksTC(el.id)))
  } catch (error) {
    error instanceof AxiosError
      ? handleServerNetworkError(error, dispatch)
      : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
  }
}
export const addTodolistTC =
  (title: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.createTodolist(title)
      if (res.data.resultCode === 0) {
        dispatch(addTodolist({ todolist: res.data.data.item }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(res.data, dispatch)
      }
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
    }
  }
export const removeTodolistTC =
  (todoID: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      dispatch(changeTodolistEntityStatus({ todoID, entityStatus: 'loading' }))
      const res = await todolistsAPI.deleteTodolist(todoID)
      if (res.data.resultCode === 0) {
        dispatch(removeTodolist({ todoID }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(res.data, dispatch)
      }
      dispatch(changeTodolistEntityStatus({ todoID, entityStatus: 'idle' }))
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
      dispatch(changeTodolistEntityStatus({ todoID, entityStatus: 'failed' }))
    }
  }
export const changeTodolistTitleTC =
  (todoID: string, title: string): AppThunk =>
  async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    try {
      dispatch(changeTodolistEntityStatus({ todoID, entityStatus: 'loading' }))
      dispatch(setAppStatus({ status: 'loading' }))

      const state = getState()
      const todolist = state.todolists.find(todo => todo.id === todoID)
      if (todolist) {
        const res = await todolistsAPI.updateTodolists(todoID, title)
        if (res.data.resultCode === 0) {
          dispatch(changeTodolistTitle({ todoID, title }))
          dispatch(setAppStatus({ status: 'succeeded' }))
          dispatch(changeTodolistEntityStatus({ todoID, entityStatus: 'idle' }))
        } else {
          handleServerError(res.data, dispatch)
        }
      }
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
      dispatch(changeTodolistEntityStatus({ todoID, entityStatus: 'failed' }))
    }
  }

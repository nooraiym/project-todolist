import { UnknownAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from './tasksSlice'
import { todolistReducer } from './todolistSlice'
import { appReducer } from './appSlice'
import { authReducer } from './authSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>
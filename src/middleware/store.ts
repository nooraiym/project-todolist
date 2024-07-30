import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { todolistReducer } from './todolist-reducer'
import { tasksReducer } from './tasks-reducer'
import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk'
import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'

//единственный объект-состояния:
export type AppRootStateType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
})

//store:
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

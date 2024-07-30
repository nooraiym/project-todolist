import { Provider } from 'react-redux'
import { AppRootStateType } from '../store'
import { v1 } from 'uuid'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { todolistReducer } from '../todolist-reducer'
import { tasksReducer } from '../tasks-reducer'
import { TaskStatuses, TaskPriorities } from 'api/todolists-api'
import { appReducer } from '../app-reducer'
import { authReducer } from '../auth-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
  },
  app: {
    status: 'loading',
    error: null,
    isInitialized: false,
  },
  auth: {
    isLoggedIn: false,
  },
}

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

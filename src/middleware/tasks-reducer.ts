import {
  AddTodolistActionType,
  ClearTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistActionType,
} from './todolist-reducer'
import {
  DomainTaskType,
  TaskStatuses,
  TaskType,
  TasksStateType,
  TaskPriorities,
  UpdateTaskType,
  todolistsAPI,
  RequestStatusType,
} from 'api/todolists-api'
import { AppDispatch, AppRootStateType, AppThunk } from './store'
import { setAppStatusAC } from './app-reducer'
import { fetchTasksHandleServerError, handleServerError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'

//types:
type UpdateTaskDomainModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
  entityStatus?: RequestStatusType
}

type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type AddTasksActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTasksActionType = ReturnType<typeof setTaskAC>

type ActionType =
  | RemoveTasksActionType
  | AddTasksActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistActionType
  | SetTasksActionType
  | ClearTodolistActionType

//data:
const initialState: TasksStateType = {}

//reducer:
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASKS': {
      return {
        ...state,
        [action.payload.todoID]: state[action.payload.todoID].filter(t => t.id !== action.payload.taskID),
      }
    }
    case 'ADD-TASKS': {
      const todoID = action.payload.task.todoListId
      let newTask: DomainTaskType = {
        ...action.payload.task,
        entityStatus: 'idle',
      }
      return { ...state, [todoID]: [newTask, ...state[todoID]] }
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.payload.todoID]: state[action.payload.todoID].map(t =>
          t.id === action.payload.taskID ? { ...t, ...action.payload.model } : t
        ),
      }
    }
    case 'ADD-TODOLIST': {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case 'REMOVE-TODOLIST': {
      let stateCopy = { ...state }
      delete stateCopy[action.payload.todoID]
      return stateCopy
    }
    case 'SET-TODOLISTS': {
      const copyState = { ...state }
      action.todolists.forEach(todo => {
        copyState[todo.id] = []
      })
      return copyState
    }
    case 'SET-TASKS': {
      const todoID = action.payload.todoID
      return {
        ...state,
        [todoID]: action.payload.tasks.map(t => ({
          ...t,
          entityStatus: 'idle',
        })),
      }
    }
    case 'CLEAR-TODOS-DATA':
      return {}
    default: {
      return state
    }
  }
}

//action creators:
export const removeTaskAC = (todoID: string, taskID: string) =>
  ({ type: 'REMOVE-TASKS', payload: { taskID, todoID } }) as const
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASKS', payload: { task } }) as const
export const updateTaskAC = (todoID: string, taskID: string, model: UpdateTaskDomainModelType) =>
  ({ type: 'UPDATE-TASK', payload: { todoID, taskID, model } }) as const
export const setTaskAC = (todoID: string, tasks: Array<TaskType>) =>
  ({ type: 'SET-TASKS', payload: { todoID, tasks } }) as const

// thunk
export const fetchTasksTC =
  (todoID: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await todolistsAPI.getTasks(todoID)
      if (res.data.error === null) {
        dispatch(setTaskAC(todoID, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        fetchTasksHandleServerError(res.data, dispatch)
      }
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
    }
  }
export const removeTaskTC =
  (todoID: string, taskID: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(updateTaskAC(todoID, taskID, { entityStatus: 'loading' }))
      dispatch(setAppStatusAC('loading'))
      const res = await todolistsAPI.deleteTask(todoID, taskID)
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(todoID, taskID))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerError(res.data, dispatch)
      }
      dispatch(updateTaskAC(todoID, taskID, { entityStatus: 'idle' }))
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
      dispatch(updateTaskAC(todoID, taskID, { entityStatus: 'failed' }))
    }
  }
export const addTaskTC =
  (todoID: string, title: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await todolistsAPI.createTask(todoID, title)
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerError(res.data, dispatch)
      }
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
    }
  }
export const updateTaskTC =
  (todoID: string, taskID: string, domainModel: UpdateTaskDomainModelType): AppThunk =>
  async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    try {
      dispatch(updateTaskAC(todoID, taskID, { entityStatus: 'loading' }))
      dispatch(setAppStatusAC('loading'))
      const state = getState()
      const tasks = state.tasks[todoID]
      const task = tasks.find(t => t.id === taskID)

      if (!task) {
        console.warn('Task not found in the state')
        return
      }

      const updatedTask: UpdateTaskType = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      }
      const res = await todolistsAPI.updateTask(todoID, taskID, updatedTask)
      if (res.data.resultCode === 0) {
        dispatch(updateTaskAC(todoID, taskID, updatedTask))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerError(res.data, dispatch)
      }
      dispatch(updateTaskAC(todoID, taskID, { entityStatus: 'idle' }))
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
      dispatch(updateTaskAC(todoID, taskID, { entityStatus: 'failed' }))
    }
  }

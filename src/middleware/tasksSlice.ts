import {
  TaskStatuses,
  TaskType,
  TasksStateType,
  TaskPriorities,
  UpdateTaskType,
  todolistsAPI,
  RequestStatusType,
} from 'api/todolists-api'
import { AppDispatch, AppRootStateType, AppThunk } from './store'
import { setAppStatus } from './appSlice'
import { fetchTasksHandleServerError, handleServerError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { addTodolist, clearTodolist, removeTodolist, setTodolist } from './todolistSlice'

type UpdateTaskDomainModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
  entityStatus?: RequestStatusType
}

export const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    setTasks: (state, action: PayloadAction<{ todoID: string; tasks: Array<TaskType> }>) => {
      const { todoID, tasks } = action.payload
      state[todoID] = tasks.map(task => ({ ...task, entityStatus: 'idle' }))
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift({ ...action.payload.task, entityStatus: 'idle' })
    },
    removeTask: (state, action: PayloadAction<{ todoID: string; taskID: string }>) => {
      const tasks = state[action.payload.todoID]
      const i = tasks.findIndex(task => task.id === action.payload.taskID)
      if (i !== -1) tasks.splice(i, 1)
    },
    updateTask: (state, action: PayloadAction<{ todoID: string; taskID: string; model: UpdateTaskDomainModelType }>) => {
      const tasks = state[action.payload.todoID]
      const i = tasks.findIndex(task => task.id === action.payload.taskID)
      if (i !== -1) tasks[i] = { ...tasks[i], ...action.payload.model }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(setTodolist, (state, action) => {
        action.payload.todolists.forEach(todo => (state[todo.id] = []))
      })
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todoID]
      })
      // .addCase(clearTodolist, (state, action) => {
      //   return {}
      // })
  },
})
export const tasksReducer = slice.reducer
export const { setTasks, addTask, removeTask, updateTask } = slice.actions

export const fetchTasksTC =
  (todoID: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.getTasks(todoID)
      if (res.data.error === null) {
        dispatch(setTasks({ todoID, tasks: res.data.items }))
        dispatch(setAppStatus({ status: 'succeeded' }))
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
      dispatch(updateTask({todoID, taskID, model: { entityStatus: 'loading' }}))
      dispatch(setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.deleteTask(todoID, taskID)
      if (res.data.resultCode === 0) {
        dispatch(removeTask({todoID, taskID}))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(res.data, dispatch)
      }
      dispatch(updateTask({todoID, taskID, model: { entityStatus: 'idle' }}))
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
      dispatch(updateTask({todoID, taskID, model: { entityStatus: 'failed' }}))
    }
  }
export const addTaskTC =
  (todoID: string, title: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const res = await todolistsAPI.createTask(todoID, title)
      if (res.data.resultCode === 0) {
        dispatch(addTask({task: res.data.data.item}))
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
export const updateTaskTC =
  (todoID: string, taskID: string, domainModel: UpdateTaskDomainModelType): AppThunk =>
  async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    try {
      dispatch(updateTask({todoID, taskID, model: { entityStatus: 'loading' }}))
      dispatch(setAppStatus({ status: 'loading' }))
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
        dispatch(updateTask({todoID, taskID, model: updatedTask}))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerError(res.data, dispatch)
      }
      dispatch(updateTask({todoID, taskID, model: { entityStatus: 'idle' }}))
    } catch (error) {
      error instanceof AxiosError
        ? handleServerNetworkError(error, dispatch)
        : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
      dispatch(updateTask({todoID, taskID, model: { entityStatus: 'failed' }}))
    }
  }

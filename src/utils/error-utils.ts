import {ResponseType, TaskResponseType} from '../api/todolists-api'
import { setAppErrorAC, setAppStatusAC } from '../middleware/app-reducer'
import { AppDispatch } from '../middleware/store'

export const handleServerError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
  data.messages.length || data
    ? dispatch(setAppErrorAC(data.messages[0]))
    : dispatch(setAppErrorAC('Something went wrong'))
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC('failed'))
}

export const fetchTasksHandleServerError = (data: TaskResponseType, dispatch: AppDispatch) => {
  data.error !== null
    ? dispatch(setAppErrorAC(data.error))
    : dispatch(setAppStatusAC('failed'))
}


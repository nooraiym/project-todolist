import { ResponseType, TaskResponseType } from 'api/todolists-api'
import { setAppError, setAppStatus } from 'middleware/appSlice'
import { AppDispatch } from 'middleware/store'

export const handleServerError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
  data.messages.length || data
    ? dispatch(setAppError({ error: data.messages[0] }))
    : dispatch(setAppError({ error: 'Something went wrong' }))
  dispatch(setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppError({ error: error.message }))
  dispatch(setAppStatus({ status: 'failed' }))
}

export const fetchTasksHandleServerError = (data: TaskResponseType, dispatch: AppDispatch) => {
  data.error !== null ? dispatch(setAppError({ error: data.error })) : dispatch(setAppStatus({ status: 'failed' }))
}

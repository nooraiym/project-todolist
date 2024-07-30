import { AxiosError } from 'axios'
import { RequestStatusType, authAPI } from 'api/todolists-api'
import { handleServerError, handleServerNetworkError } from 'utils/error-utils'
import { AppDispatch } from './store'
import { setIsLoggedIn } from './auth-reducer'

export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}
type ActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppIsInitialized>

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'login/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status }) as const
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error }) as const
const setAppIsInitialized = (isInitialized: boolean) => ({ type: 'login/SET-IS-INITIALIZED', isInitialized }) as const

export const me = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn(true))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerError(res.data, dispatch)
    }
    dispatch(setAppIsInitialized(true))
  } catch (error) {
    error instanceof AxiosError
      ? handleServerNetworkError(error, dispatch)
      : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
    setAppStatusAC('failed')
  }
}

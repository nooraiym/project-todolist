import { AxiosError } from "axios"
import { AppDispatch, AppThunk } from "./store"
import { handleServerError, handleServerNetworkError } from "../utils/error-utils"
import { setAppStatusAC } from "./app-reducer"
import { LoginParamsType, authAPI } from "../api/todolists-api"

type InitialStateType = typeof initialState
export type AuthActionsType =
| ReturnType<typeof setIsLoggedIn>

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.isLoggedIn}
    default:
      return state;
  }
}

export const setIsLoggedIn = (isLoggedIn: boolean) => {
  return { type: 'login/SET-IS-LOGGED-IN', isLoggedIn }
}

export const login = (params: LoginParamsType): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.login(params)
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn(true))
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

export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn(false))
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
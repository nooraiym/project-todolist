import { AxiosError } from 'axios'
import { AppDispatch, AppThunk } from './store'
import { handleServerError, handleServerNetworkError } from 'utils/error-utils'
import { setAppStatus } from './appSlice'
import { LoginParamsType, authAPI } from 'api/todolists-api'
import { clearTodolist } from './todolistSlice'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectIsLoggedIn: sliceState => sliceState.isLoggedIn
  }
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions
export const { selectIsLoggedIn } = slice.selectors

export const login =
  (params: LoginParamsType): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const res = await authAPI.login(params)
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
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

export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(clearTodolist({}))
    } else {
      handleServerError(res.data, dispatch)
    }
  } catch (error) {
    error instanceof AxiosError
      ? handleServerNetworkError(error, dispatch)
      : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
  }
}

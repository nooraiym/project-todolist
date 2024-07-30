import { AxiosError } from 'axios'
import { RequestStatusType, authAPI } from 'api/todolists-api'
import { handleServerError, handleServerNetworkError } from 'utils/error-utils'
import { AppDispatch } from './store'
import { setIsLoggedIn } from './authSlice'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type AppInitialState = ReturnType<typeof slice.getInitialState>

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  selectors: {
    selectStatus: sliceState => sliceState.status,
    selectError: sliceState => sliceState.error,
    selectIsInitialized: sliceState => sliceState.isInitialized,
  }
})
export const appReducer = slice.reducer
export const { setAppStatus, setAppError, setAppIsInitialized } = slice.actions
export const { selectStatus, selectError, selectIsInitialized } = slice.selectors

export const me = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      handleServerError(res.data, dispatch)
    }
    dispatch(setAppIsInitialized({ isInitialized: true }))
  } catch (error) {
    error instanceof AxiosError
      ? handleServerNetworkError(error, dispatch)
      : handleServerNetworkError({ message: 'Unknown error occurred' }, dispatch)
    setAppStatus({ status: 'failed' })
  }
}
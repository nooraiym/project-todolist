import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'middleware/store'

// Use throughout your app instead of plain useDispatch and useSelector
// export const useAppDispatch = () => useDispatch<AppDispatch>() //для санок
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
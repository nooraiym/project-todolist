import { v1 } from "uuid"
import { FilterValuesType } from "../App"
import { TodolistType, todolistsAPI } from "../api/todolists-api"
import { AppDispatch, AppRootStateType, AppThunk } from "./store"
import { fetchTasksTC } from "./tasks-reducer"
import { setAppStatusAC } from "./app-reducer"

//types:
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionType =
| RemoveTodolistActionType
| AddTodolistActionType
| ChangeTodolistTitleActionType
| ChangeTodolistFilterActionType
| SetTodolistActionType

//data:
export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState: Array<TodolistDomainType> = [];

//reducer:
export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter( tl => tl.id !== action.payload.todoID);
        case 'ADD-TODOLIST':
            return [{...action.payload.todolist, filter: 'all'},...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map( tl => tl.id === action.payload.todoID ? {...tl, title: action.payload.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map( tl => tl.id === action.payload.todoID ? {...tl, filter: action.payload.filter} : tl);
        case 'SET-TODOLISTS':
            return action.todolists.map(todo => ({...todo, filter: 'all'}))
        default:
            return state
    }
}

//action creators:
export const removeTodolistAC = (todoID: string) => ({type: 'REMOVE-TODOLIST', payload: {todoID}} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', payload: {todolist}} as const)
export const changeTodolistTitleAC = (todoID: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', payload: {todoID, title}} as const)
export const changeTodolistFilterAC = (todoID: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', payload: {todoID, filter}} as const)
export const setTodolistAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunk
export const fetchTodolistsTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistAC(res.data))
        res.data.map(el => dispatch(fetchTasksTC(el.id)))
        dispatch(setAppStatusAC('succeeded'))

    } catch(error) {
        console.log(error)
    }
}
export const addTodolistTC = (title: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.createTodolist(title)
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
    } catch(error) {
        console.log(error);
    }
}
export const removeTodolistTC = (todoID: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        await todolistsAPI.deleteTodolist(todoID)
        dispatch(removeTodolistAC(todoID))
    } catch(error) {
        console.log(error);
    }
}
export const changeTodolistTitleTC = (todoID: string, title: string): AppThunk => async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    try {
        const state = getState();
        const todolist = state.todolists.find(todo => todo.id === todoID);
        if(todolist) {
            await todolistsAPI.updateTodolists(todoID, title)
            dispatch(changeTodolistTitleAC(todoID, title))
        }
    } catch(error) {
        console.log(error);
    }
}
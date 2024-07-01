import { v1 } from "uuid"
import { FilterValuesType } from "../App"
import { TodolistType, todolistsAPI } from "../api/todolists-api"
import { AppDispatch, AppRootStateType, AppThunk } from "./store"
import { fetchTasksTC } from "./tasks-reducer"

//types:
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todoID: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        todoID: string
        title: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todoID: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        todoID: string
        filter: FilterValuesType
    }
}
export type SetTodolistActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
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
        case 'REMOVE-TODOLIST': {
            return state.filter( tl => tl.id !== action.payload.todoID);
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = { id: action.payload.todoID, title: action.payload.title, filter: 'all', addedDate: '', order: 0 }
            return [newTodolist,...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map( tl => tl.id === action.payload.todoID ? {...tl, title: action.payload.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map( tl => tl.id === action.payload.todoID ? {...tl, filter: action.payload.filter} : tl);
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(todo => ({...todo, filter: 'all'}))
        }
        default: {
            return state
        }
    }
}

//action creators:
export const removeTodolistAC = (todoID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', payload: {todoID}}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', payload: {title, todoID: v1()}}
}
export const changeTodolistTitleAC = (todoID: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {todoID, title }}
}
export const changeTodolistFilterAC = (todoID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {todoID, filter }}
}
export const setTodolistAC = (todolists: Array<TodolistType>): SetTodolistActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

// thunk
export const fetchTodolistsTC = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistAC(res.data))
        res.data.map(el => dispatch(fetchTasksTC(el.id)))
    } catch (error) {
        console.log(error)
    }
}

export const addTodolistTC = (title: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        await todolistsAPI.createTodolist(title)
        dispatch(addTodolistAC(title))
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

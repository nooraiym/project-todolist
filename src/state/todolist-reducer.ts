import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"

//types:
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
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
type ActionType = 
| RemoveTodolistActionType
| AddTodolistActionType
| ChangeTodolistTitleActionType
| ChangeTodolistFilterActionType

//data:
let todolistID1 = v1();
let todolistID2 = v1();

let initialState: TodolistType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]

//reducer:
export const todolistReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch(action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter( tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = { id: action.payload.todoID, title: action.payload.title, filter: 'all' }
            return [...state, newTodolist];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map( tl => tl.id === action.payload.todoID ? {...tl, title: action.payload.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map( tl => tl.id === action.payload.todoID ? {...tl, filter: action.payload.filter} : tl);
        }
        default: {
            throw new Error("I don't understand action type")
        }
    }
}

//action creators:
export const RemoveTodolistAC = (todoID: string):RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', payload: {id: todoID}} as const;
}
export const AddTodolistAC = (title: string):AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', payload: {title, todoID: v1()}} as const;
}
export const ChangeTodolistTitleAC = (todoID: string, title: string):ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {todoID, title }} as const;
}
export const ChangeTodolistFilterAC = (todoID: string, filter: FilterValuesType):ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {todoID, filter }} as const;
}
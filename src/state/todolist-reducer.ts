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
        id: string
        title: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
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
            const newTodolist: TodolistType = { id: action.payload.id, title: action.payload.title, filter: 'all' }
            return [...state, newTodolist];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map( tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map( tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl);
        }
        default: {
            throw new Error("I don't understand action type")
        }
    }
}


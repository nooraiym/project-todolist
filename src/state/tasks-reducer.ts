import { v1 } from "uuid"
import { TaskType } from "../components/todolist/Todolist"
import { AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer"
import { TasksStateType } from "../AppWithRedux"

//types:
export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTasksActionType = ReturnType<typeof addTaskAC>
export type ChangeTasksTitleActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTasksFilterActionType = ReturnType<typeof changeTaskTitleAC>

type ActionType = 
| RemoveTasksActionType
| AddTasksActionType
| ChangeTasksTitleActionType
| ChangeTasksFilterActionType
| AddTodolistActionType
| RemoveTodolistActionType

//data:
const initialState: TasksStateType = {};

//reducer:
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch(action.type) {
        case 'REMOVE-TASKS': {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID]
                .filter(t => t.id !== action.payload.tasksID)};
        }
        case 'ADD-TASKS': {
            let newTask: TaskType = { id: v1(), title: action.payload.title , isDone: false };
            return {...state, [action.payload.todoID]: [newTask,...state[action.payload.todoID]]};
        }
        case 'CHANGE-TASKS-FILTER': {
            return {...state,
                [action.payload.todoID]: state[action.payload.todoID]
                .map(t => t.id === action.payload.tasksID ? {...t, isDone: action.payload.isDone} : t)};
        }
        case 'CHANGE-TASKS-TITLE': {
            return {...state,
                [action.payload.todoID]: state[action.payload.todoID]
                .map(t => t.id === action.payload.tasksID ? {...t, title: action.payload.title} : t)};
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todoID]: []}
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state};
            delete stateCopy[action.payload.todoID];
            return stateCopy;
        }
        default: {
            return state
        }
    }
}

//action creators:
export const removeTaskAC = (tasksID: string, todoID: string) => {
    return {type: 'REMOVE-TASKS', payload: {tasksID, todoID}} as const;
}
export const addTaskAC = (title: string, todoID: string) => {
    return {type: 'ADD-TASKS', payload: {title, todoID}} as const;
}
export const changeTaskStatusAC = (tasksID: string, isDone: boolean, todoID: string) => {
    return {type: 'CHANGE-TASKS-FILTER', payload: {tasksID, isDone, todoID}} as const;
}
export const changeTaskTitleAC = (tasksID: string, title: string, todoID: string) => {
    return {type: 'CHANGE-TASKS-TITLE', payload: {tasksID, title, todoID}} as const;
}
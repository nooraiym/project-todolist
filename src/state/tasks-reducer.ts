import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { TaskType } from "../components/Todolist"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolist-reducer"

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
let todolistID1 = v1()
let todolistID2 = v1()

let initialState: TasksStateType = {
    [todolistID1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
        { id: v1(), title: 'Rest API', isDone: true },
        { id: v1(), title: 'GraphQL', isDone: false },
    ],
};

//reducer:
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch(action.type) {
        case 'REMOVE-TASKS': {
            return {...state,
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
            delete stateCopy[action.payload.id];
            return stateCopy;
            // let {[action.payload.id]: [], ...rest} = state;
            // return rest;
        }
        default: {
            throw new Error("I don't understand action type")
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
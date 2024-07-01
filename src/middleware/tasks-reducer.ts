import { v1 } from "uuid"
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolist-reducer"
import { TasksStateType } from "../App"
import { TaskStatuses, TaskType, TodoTaskPriorities, todolistsAPI } from "../api/todolists-api"
import { AppDispatch, AppRootStateType, AppThunk } from "./store"

//types:
export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTasksActionType = ReturnType<typeof addTaskAC>
export type ChangeTasksTitleActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTasksFilterActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTaskAC>

type ActionType = 
| RemoveTasksActionType
| AddTasksActionType
| ChangeTasksTitleActionType
| ChangeTasksFilterActionType
| AddTodolistActionType
| RemoveTodolistActionType
| SetTodolistActionType
| SetTasksActionType

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
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.payload.todoID]
            // const newTasks = [action.payload.newTask, ...tasks]
            // stateCopy[action.payload.todoID] = newTasks
            // return stateCopy
            const todoID = action.payload.task.todoListId
            let newTask: TaskType = action.payload.task;
            return {...state, [todoID]: [newTask, ...state[todoID]]}
        }
        case 'CHANGE-TASKS-FILTER': {
            return {...state,
                [action.payload.todoID]: state[action.payload.todoID]
                .map(t => t.id === action.payload.tasksID ? {...t, status: action.payload.status} : t)};
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
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(todo => {
                copyState[todo.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            const todoID = action.payload.todoID
            return {...state, [todoID]: action.payload.tasks.map(t => ({...t, isDone: false}))}
        }
        default: {
            return state
        }
    }
}

//action creators:
export const removeTaskAC = (todoID: string, tasksID: string) => {
    return {type: 'REMOVE-TASKS', payload: {tasksID, todoID}} as const;
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASKS', payload: { task }} as const;
}
export const changeTaskStatusAC = (todoID: string, tasksID: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASKS-FILTER', payload: {todoID, tasksID, status}} as const;
}
export const changeTaskTitleAC = (todoID: string, tasksID: string, title: string) => {
    return {type: 'CHANGE-TASKS-TITLE', payload: {tasksID, title, todoID}} as const;
}
export const setTaskAC = (todoID: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASKS', payload: {todoID, tasks}} as const;
}

// thunk
export const fetchTasksTC = (todoID: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await todolistsAPI.getTasks(todoID)
        dispatch(setTaskAC(todoID, res.data.items))
    } catch (error) {
        console.log(error)
    }
}
export const removeTaskTC = (todoID: string, taskID: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        await todolistsAPI.deleteTask(todoID, taskID)
        dispatch(removeTaskAC(todoID, taskID))
    } catch (error) {
        console.log(error)
    }
}

export const addTaskTC = (todoID: string, title: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await todolistsAPI.createTask(todoID, title)
        dispatch(addTaskAC(res.data.data.item))
    } catch (error) {
        console.log(error)
    }
}
export const changeTaskStatusTC = (todoID: string, taskID: string, status: TaskStatuses): AppThunk => async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    try {
        const state = getState();
        const tasks = state.tasks[todoID];
        const task = tasks.find(t => t.id === taskID);

        if (task) {
            const updatedTask = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status,
            }
            await todolistsAPI.updateTask(todoID, taskID, updatedTask)
            dispatch(changeTaskStatusAC(todoID, taskID, status))
        }
        
    } catch (error) {
        console.log(error)
    }
}
export const changeTaskTitleTC = (todoID: string, taskID: string, title: string): AppThunk => async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    try {
        const state = getState();
        const tasks = state.tasks[todoID];
        const task = tasks.find(t => t.id === taskID);

        if (task) {
            const updatedTask = {
                title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
            }
            await todolistsAPI.updateTask(todoID, taskID, updatedTask)
            dispatch(changeTaskTitleAC(todoID, taskID, title))
        }
        
    } catch (error) {
        console.log(error)
    }
}

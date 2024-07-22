import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolist-reducer"
import { TasksStateType } from "../App"
import { TaskStatuses, TaskType, todolistsAPI } from "../api/todolists-api"
import { AppDispatch, AppRootStateType, AppThunk } from "./store"
import { setAppErrorAC, setAppStatusAC } from "./app-reducer"

//types:
type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type AddTasksActionType = ReturnType<typeof addTaskAC>
type ChangeTasksTitleActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTasksFilterActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTaskAC>

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
                .filter(t => t.id !== action.payload.tasksID)
            }
        }
        case 'ADD-TASKS': {
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
            return {...state, [action.payload.todolist.id]: []}
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
export const removeTaskAC = (todoID: string, tasksID: string) => 
    ({type: 'REMOVE-TASKS', payload: {tasksID, todoID}} as const)
export const addTaskAC = (task: TaskType) => 
    ({type: 'ADD-TASKS', payload: { task }} as const)
export const changeTaskStatusAC = (todoID: string, tasksID: string, status: TaskStatuses) => 
    ({type: 'CHANGE-TASKS-FILTER', payload: {todoID, tasksID, status}} as const)
export const changeTaskTitleAC = (todoID: string, tasksID: string, title: string) => 
    ({type: 'CHANGE-TASKS-TITLE', payload: {tasksID, title, todoID}} as const)
export const setTaskAC = (todoID: string, tasks: Array<TaskType>) => 
    ({type: 'SET-TASKS', payload: {todoID, tasks}} as const)

// thunk
export const fetchTasksTC = (todoID: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.getTasks(todoID)
        dispatch(setTaskAC(todoID, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch(error) {
        console.log(error)
    }
}
export const removeTaskTC = (todoID: string, taskID: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await todolistsAPI.deleteTask(todoID, taskID)
        dispatch(removeTaskAC(todoID, taskID))
        dispatch(setAppStatusAC('succeeded'))
    } catch(error) {
        console.log(error)
    }
}
export const addTaskTC = (todoID: string, title: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistsAPI.createTask(todoID, title)
        
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            res.data.messages.length 
            ? dispatch(setAppErrorAC(res.data.messages[0]))
            : dispatch(setAppErrorAC('Some error occured'))
            dispatch(setAppStatusAC('failed'))
        }
    } catch(error) {
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
        
    } catch(error) {
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
        
    } catch(error) {
        console.log(error)
    }
}
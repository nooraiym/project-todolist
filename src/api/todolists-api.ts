import axios from 'axios'
//types:
export type FilterValuesType = "all" | "active" | "completed"
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type FieldErrorType = {
    error: string
    field: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3 
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type DomainTaskType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksStateType = { [key: string]: Array<DomainTaskType> }
//instance:
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "37c959d5-1aad-482b-a6de-5764ea80faf4"
    },
})
//API requests:
export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todoID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
    },
    updateTodolists(todoID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title})
    },

    getTasks(todoID: string) {
        return instance.get<TaskResponseType>(`todo-lists/${todoID}/tasks`)
    },
    createTask(todoID: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoID}/tasks`, {title})
    },
    deleteTask(todoID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoID}/tasks/${taskID}`)
    },
    updateTask(todoID: string, taskID: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todoID}/tasks/${taskID}`, model)
    }
}
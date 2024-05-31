import axios from 'axios'

type TodolistAPIType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type FieldErrorType = {
    error: string
    field: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "37c959d5-1aad-482b-a6de-5764ea80faf4"
    },
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistAPIType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistAPIType}>>('todo-lists', {title})
    },
    deleteTodolist(todoID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
    },
    updateTodolists(todoID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title})
    },
}
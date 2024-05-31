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

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}



const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "37c959d5-1aad-482b-a6de-5764ea80faf4"
    }
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get<Array<TodolistAPIType>>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            settings
        )
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<ResponseType<{ item: TodolistAPIType }>>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            { title }, 
            settings
        )
        return promise
    },
    deleteTodolist(todoID: string) {
        const promise = axios.delete<ResponseType<{}>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`,
            settings
        )
        return promise
    },
    updateTodolists(todoID: string, title: string) {
    const promise = axios.put<ResponseType<{}>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`,
            { title },
            settings
        )
    return promise
    },
}
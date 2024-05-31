import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт, который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('OOOO')
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoID = '0dcba12e-f465-48ee-ae68-b01efcb123a8';
    useEffect(() => {
        todolistsAPI.deleteTodolist(todoID)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoID = "2a689aca-45b0-4886-bbb7-eba561937bb8"
    useEffect(() => {
        todolistsAPI.updateTodolists(todoID, 'BLAVLA')
        .then( (res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
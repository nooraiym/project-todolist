import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт, который в виде строки будем отображать в div-ке
    todolistsAPI.getTodolists().then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.createTodolist('OOOO').then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const todoID = '0dcba12e-f465-48ee-ae68-b01efcb123a8'
  useEffect(() => {
    todolistsAPI.deleteTodolist(todoID).then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const todoID = '2a689aca-45b0-4886-bbb7-eba561937bb8'
  useEffect(() => {
    todolistsAPI.updateTodolists(todoID, 'BLAVLA').then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoID, setTodoID] = useState<string>('')
  const getTasks = () => {
    todolistsAPI.getTasks(todoID).then(res => setState(res.data))
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input placeholder="enter todolist ID" value={todoID} onChange={e => setTodoID(e.currentTarget.value)} />
        <button onClick={getTasks}>get tasks for particular todolist</button>
      </div>
    </div>
  )
}

export const CreateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoID, setTodoID] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const createTask = () => {
    todolistsAPI.createTask(todoID, title).then(res => setState(res.data))
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input placeholder="enter todolist ID" value={todoID} onChange={e => setTodoID(e.currentTarget.value)} />
        <input placeholder="enter new title" value={title} onChange={e => setTitle(e.currentTarget.value)} />
        <button onClick={createTask}>create new task</button>
      </div>
    </div>
  )
}

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoID, setTodoID] = useState<string>('')
  const [taskID, setTaskID] = useState<string>('')

  const deleteTask = () => {
    todolistsAPI.deleteTask(todoID, taskID).then(res => setState(res.data))
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input placeholder="enter todolist ID" value={todoID} onChange={e => setTodoID(e.currentTarget.value)} />
        <input placeholder="enter task ID" value={taskID} onChange={e => setTaskID(e.currentTarget.value)} />
        <button onClick={deleteTask}>delete task</button>
      </div>
    </div>
  )
}

export const UpdateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoID, setTodoID] = useState<string>('')
  const [taskID, setTaskID] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  // const [startDate, setStartDate] = useState<string>("")
  // const [deadline, setDeadline] = useState<string>("")

  const updateTask = () => {
    todolistsAPI
      .updateTask(todoID, taskID, {
        title,
        description,
        status,
        priority,
        startDate: '',
        deadline: '',
      })
      .then(res => setState(res.data))
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input placeholder="enter todolist ID" value={todoID} onChange={e => setTodoID(e.currentTarget.value)} />
        <input placeholder="enter task ID" value={taskID} onChange={e => setTaskID(e.currentTarget.value)} />
        <input placeholder="enter new title" value={title} onChange={e => setTitle(e.currentTarget.value)} />
        <input placeholder="description" value={description} onChange={e => setDescription(e.currentTarget.value)} />
        <input placeholder="status" value={status} onChange={e => setStatus(+e.currentTarget.value)} />
        <input placeholder="priority" value={priority} onChange={e => setPriority(+e.currentTarget.value)} />
        <button onClick={updateTask}>update task title</button>
      </div>
    </div>
  )
}

import { TasksStateType } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { TodolistDomainType, addTodolistAC, setTodolistAC, todolistReducer } from "./todolist-reducer"


test('ids should be equal', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoID)
    expect(idFromTodolists).toBe(action.payload.todoID)
})
test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toBeDefined()
})
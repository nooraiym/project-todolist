import { TasksStateType } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { TodolistDomainType, addTodolistAC, todolistReducer } from "./todolist-reducer"


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
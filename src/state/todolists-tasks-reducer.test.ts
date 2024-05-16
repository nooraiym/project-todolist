import { TasksStateType, TodolistType } from "../AppWithReducers"
import { tasksReducer } from "./tasks-reducer"
import { addTodolistAC, todolistReducer } from "./todolist-reducer"


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoID)
    expect(idFromTodolists).toBe(action.payload.todoID)
})
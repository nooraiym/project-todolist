import { v1 } from 'uuid'
import { tasksReducer } from './tasks-reducer'
import { addTodolistAC, setTodolistAC, todolistReducer } from './todolist-reducer'
import { TasksStateType, TodolistDomainType } from 'api/todolists-api'

test('ids should be equal', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolistAC({
    id: v1(),
    title: 'New todolist',
    addedDate: '',
    order: 0,
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
test('empty arrays should be added when we set todolists', () => {
  const action = setTodolistAC([
    { id: '1', title: 'title 1', order: 0, addedDate: '' },
    { id: '2', title: 'title 2', order: 0, addedDate: '' },
  ])
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toBeDefined()
})

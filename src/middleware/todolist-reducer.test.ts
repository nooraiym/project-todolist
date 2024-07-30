import { v1 } from 'uuid'
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistAC,
  todolistReducer,
} from './todolist-reducer'
import { RequestStatusType, TodolistDomainType } from 'api/todolists-api'

let todolistID1: string
let todolistID2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = [
    {
      id: todolistID1,
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistID2,
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ]
})

test('correct todolist should be removed', () => {
  //action:
  const endState = todolistReducer(startState, removeTodolistAC(todolistID1))

  //expect:
  expect(endState).toHaveLength(1)
  expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', () => {
  //action:
  const endState = todolistReducer(
    startState,
    addTodolistAC({
      id: v1(),
      title: 'New todolist',
      addedDate: '',
      order: 0,
    })
  )

  //expect:
  expect(endState).toHaveLength(3)
  expect(endState[0].title).toBe('New todolist')
  expect(endState[0].filter).toBe('all')
})
test('correct todolist should change its name', () => {
  //action:
  const endState = todolistReducer(startState, changeTodolistTitleAC(todolistID2, 'New todolist'))

  //expect:
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe('New todolist')
})
test('correct filter of todolist should be changed', () => {
  //action:
  const endState = todolistReducer(startState, changeTodolistFilterAC(todolistID2, 'completed'))

  //expect:
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe('completed')
})
test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading'
  //action:
  const endState = todolistReducer(startState, changeTodolistEntityStatusAC(todolistID2, newStatus))

  //expect:
  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe(newStatus)
})
test('todolists should be set to the state', () => {
  //action:
  const endState = todolistReducer([], setTodolistAC(startState))

  //expect:
  expect(endState.length).toBe(2)
})

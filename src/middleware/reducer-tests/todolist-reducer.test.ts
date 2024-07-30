import { v1 } from 'uuid'
import {
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
  setTodolist,
  todolistReducer,
} from '../todolistSlice'
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
  const endState = todolistReducer(startState, removeTodolist({todoID: todolistID1}))

  //expect:
  expect(endState).toHaveLength(1)
  expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', () => {
  //action:
  const endState = todolistReducer(
    startState,
    addTodolist({todolist: {
      id: v1(),
      title: 'New todolist',
      addedDate: '',
      order: 0,
    }})
  )

  //expect:
  expect(endState).toHaveLength(3)
  expect(endState[0].title).toBe('New todolist')
  expect(endState[0].filter).toBe('all')
})
test('correct todolist should change its name', () => {
  //action:
  const endState = todolistReducer(startState, changeTodolistTitle({todoID: todolistID2, title: 'New todolist'}))

  //expect:
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe('New todolist')
})
test('correct filter of todolist should be changed', () => {
  //action:
  const endState = todolistReducer(startState, changeTodolistFilter({todoID: todolistID2, filter: 'completed'}))

  //expect:
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe('completed')
})
test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading'
  //action:
  const endState = todolistReducer(startState, changeTodolistEntityStatus({todoID: todolistID2, entityStatus: newStatus}))

  //expect:
  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe(newStatus)
})
test('todolists should be set to the state', () => {
  //action:
  const endState = todolistReducer([], setTodolist({todolists: startState}))

  //expect:
  expect(endState.length).toBe(2)
})

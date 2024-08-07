import { v1 } from 'uuid'
import { TaskStatuses, TaskPriorities, TasksStateType } from 'api/todolists-api'
import { removeTask, setTasks, tasksReducer, updateTask } from '../tasksSlice'
import { addTodolist, removeTodolist } from '../todolistSlice'

let startState: TasksStateType = {}
beforeEach(() => {
  startState = {
    todolistID1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
    todolistID2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  const action = removeTask({ todoID: 'todolistID2', taskID: '2' })
  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    todolistID1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID1',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
    todolistID2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistID2',
        order: 0,
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
  })
})
test('status of specified task should be changed', () => {
  const action = updateTask({ todoID: 'todolistID2', taskID: '2', model: { status: TaskStatuses.New } })
  const endState = tasksReducer(startState, action)

  expect(endState['todolistID1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistID2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {
  const action = updateTask({ todoID: 'todolistID2', taskID: '2', model: { title: 'chips' } })
  const endState = tasksReducer(startState, action)

  expect(endState['todolistID1'][1].title).toBe('JS')
  expect(endState['todolistID2'][1].title).toBe('chips')
})
test('new array should be added when new todolist is added', () => {
  const action = addTodolist({
    todolist: {
      id: v1(),
      title: 'New todolist',
      addedDate: '',
      order: 0,
    },
  })
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistID1' && k != 'todolistID2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
  const action = removeTodolist({ todoID: 'todolistID2' })
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistID2']).not.toBeDefined()
})
test('tasks should be added to todolist', () => {
  const action = setTasks({ todoID: 'todolistID1', tasks: startState['todolistID1'] })
  const endState = tasksReducer(
    {
      todolistID2: [],
      todolistID1: [],
    },
    action
  )

  expect(endState['todolistID1'].length).toBe(3)
  expect(endState['todolistID2'].length).toBe(0)
})

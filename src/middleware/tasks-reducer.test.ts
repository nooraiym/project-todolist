import { v1 } from 'uuid';
import { TasksStateType } from '../App'
import { TaskStatuses, TodoTaskPriorities } from '../api/todolists-api';
import { removeTaskAC, setTaskAC, tasksReducer, updateTaskAC } from './tasks-reducer'
import { addTodolistAC, removeTodolistAC } from './todolist-reducer'

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistID1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID1', order: 0, addedDate: ''}
        ],
        'todolistID2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID2', order: 0, addedDate: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID2', order: 0, addedDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID2', order: 0, addedDate: ''}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistID2', '2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistID1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID1', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID1', order: 0, addedDate: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID1', order: 0, addedDate: ''}
        ],
        'todolistID2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID2', order: 0, addedDate: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistID2', order: 0, addedDate: ''}
        ]
    })
})
test('status of specified task should be changed', () => {
    const action = updateTaskAC('todolistID2', '2', { status: TaskStatuses.New})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistID2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {
    const action = updateTaskAC('todolistID2', '2', { title: 'chips' })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistID1'][1].title).toBe('JS')
    expect(endState['todolistID2'][1].title).toBe('chips')
})
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: v1(),
        title: 'New todolist',
        addedDate: '',
        order: 0
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
    const action = removeTodolistAC('todolistID2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).not.toBeDefined()
})
test('tasks should be added to todolist', () => {
    const action = setTaskAC('todolistID1', startState['todolistID1'])
    const endState = tasksReducer({
        'todolistID2': [],
        'todolistID1': []
    }, action)

    expect(endState['todolistID1'].length).toBe(3)
    expect(endState['todolistID2'].length).toBe(0)
})
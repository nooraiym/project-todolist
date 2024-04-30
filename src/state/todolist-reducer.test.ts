import { v1 } from "uuid"
import { TodolistType } from "../App"
import { AddTodolistActionType, ChangeTodolistFilterActionType, ChangeTodolistTitleActionType, RemoveTodolistActionType, todolistReducer } from "./todolist-reducer"

test('correct todolist should be removed', ()=> {

//data:
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
]

//action:
    const action: RemoveTodolistActionType = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID1,
        }
    } as const;
    const endState = todolistReducer(startState, action)

//expect:
    expect(endState).toHaveLength(1);
    expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', ()=> {

//data:
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
]

//action:
    const action: AddTodolistActionType = {
        type: 'ADD-TODOLIST',
        payload: {
            id: v1(),
            title: 'New todolist'
        }
    } as const;
    const endState = todolistReducer(startState, action)

//expect:
    expect(endState).toHaveLength(3);
    expect(endState[2].id).toBe(action.payload.id)
    expect(endState[2].title).toBe(action.payload.title)
    expect(endState[2].filter).toBe('all')
})
test('correct todolist should change its name', ()=> {

//data:
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
]

//action:
    const action: ChangeTodolistTitleActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistID2,
            title: 'New todolist',
        },
    } as const;
    const endState = todolistReducer(startState, action)

//expect:
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(action.payload.title);
})
test('correct filter of todolist should be changed', ()=> {

//data:
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
]

//action:
    const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistID2,
            filter: 'completed',
        },
    } as const;
    const endState = todolistReducer(startState, action)

//expect:
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(action.payload.filter);
})
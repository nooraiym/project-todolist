import { v1 } from "uuid"
import { TodolistType } from "../App"
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistReducer } from "./todolist-reducer"

test('correct todolist should be removed', ()=> {

//data:
    let todolistID1 = v1()
    let todolistID2 = v1()

    let startState: TodolistType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
]

//action:
    const endState = todolistReducer(startState, RemoveTodolistAC(todolistID1))

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
    const endState = todolistReducer(startState, AddTodolistAC('New todolist'))

//expect:
    expect(endState).toHaveLength(3);
    expect(endState[2].title).toBe('New todolist')
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
    const endState = todolistReducer(startState, ChangeTodolistTitleAC(todolistID2,'New todolist'))

//expect:
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('New todolist');
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
    const endState = todolistReducer(startState, ChangeTodolistFilterAC(todolistID2, 'completed'))

//expect:
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed');
})
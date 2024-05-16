import {combineReducers, legacy_createStore} from 'redux';
import { todolistReducer } from './todolist-reducer';
import { tasksReducer } from './tasks-reducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

// непосредственно создаём store
export const store = legacy_createStore(rootReducer);

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
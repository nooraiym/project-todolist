import { Provider } from 'react-redux';
import { AppRootStateType } from '../store';
import { v1 } from 'uuid';
import { combineReducers, legacy_createStore } from 'redux';
import { todolistReducer } from '../todolist-reducer';
import { tasksReducer } from '../tasks-reducer';
import { TaskStatuses, TodoTaskPriorities } from '../../api/todolists-api';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState: AppRootStateType = {
todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: "todolistId1", order: 0, addedDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: "todolistId1", order: 0, addedDate: ''}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: "todolistId2", order: 0, addedDate: ''},
            {id: v1(), title: "React Book", status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: "todolistId2", order: 0, addedDate: ''}
        ]
    }
};

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
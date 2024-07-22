import type { Meta, StoryObj } from '@storybook/react';
import { Task } from '../components/Task';
import { ReduxStoreProviderDecorator } from '../middleware/decorators/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../middleware/store';
import { TaskStatuses, TaskType, TodoTaskPriorities } from '../api/todolists-api';

const meta: Meta<typeof Task> = {
    title: 'Todolists/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta;

type Story = StoryObj<typeof Task>;
export const Primary: Story = {
    args: {
        task: {id: 'sdd', title: 'Something', status: TaskStatuses.New, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''}
    }
}

export const Secondary: Story = {
    args: {
        task: {id: 'sferf', title: 'Something another', status: TaskStatuses.Completed, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''}
    }
}

const TaskWrapper = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if (!task) task = {id: 'fdf', title: 'There\'s no tasks', status: TaskStatuses.Completed, description: '', priority: TodoTaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''};
        return (
            <Task todoID={'todolistId1'} task={task} />
        )
}

export const Toggle: Story = {
    render: () => <TaskWrapper />
}

// вариант с кликабельны таском (нужно добавить события и их обработчики)
// export const Secondary: Story = {
//     render: () => {
//         const [task, setTask] = useState({id: '', title: '', isDone: false})
//         return <Task todolistID={''} task={task} />
//     }
// }
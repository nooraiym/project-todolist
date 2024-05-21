import type { Meta, StoryObj } from '@storybook/react';
import { Task } from '../components/Task';
import { ReduxStoreProviderDecorator } from '../state/decorators/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { TaskType } from '../components/todolist/Todolist';

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
        task: {id: 'sdd', title: 'Something', isDone: false}
    }
}

export const Secondary: Story = {
    args: {
        task: {id: 'sferf', title: 'Something another', isDone: true}
    }
}

const TaskWrapper = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if (!task) task = {id: 'fdf', title: 'There\'s no tasks', isDone: true};
        return (
            <Task todolistID={'todolistId1'} task={task} />
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
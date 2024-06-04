import type { Meta, StoryObj } from '@storybook/react';
import AppWithRedux from '../App';
import { ReduxStoreProviderDecorator } from '../state/decorators/ReduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
    title: 'Todolists/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [ReduxStoreProviderDecorator]
};
export default meta;

type Story = StoryObj<typeof meta>

export const AppWithReduxStory: Story = {}

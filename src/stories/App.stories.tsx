import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../middleware/decorators/ReduxStoreProviderDecorator'
import App from '../App'

const meta: Meta<typeof App> = {
  title: 'Todolists/App',
  component: App,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof meta>

export const AppStory: Story = {
  args: {
    demo: true,
  },
}

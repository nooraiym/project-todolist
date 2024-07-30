import type { Meta, StoryObj } from '@storybook/react'
import { EditableSpan } from '../components/EditableSpan'
import { fn } from '@storybook/test'

const meta: Meta<typeof EditableSpan> = {
  title: 'Todolists/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: 'HMTL',
    onChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const Default: Story = {}

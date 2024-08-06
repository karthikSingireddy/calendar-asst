import type { Meta, StoryObj } from '@storybook/react';
// @ts-expect-error
import { Login } from './Login';

const meta: Meta<typeof Login> = {
  component: Login,
  title: 'login',
};
export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {
};

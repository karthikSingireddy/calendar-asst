import type { Meta, StoryObj } from '@storybook/react';
// @ts-expect-error idk why this is happening
import { Login } from './Login';

const meta: Meta<typeof Login> = {
  component: Login,
  title: 'login',
};
export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {
};

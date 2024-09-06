// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import { Default, CardProps } from 'components/authorable/shared/hztl-page-content/Card';
import defaultData from './Card.mock-data';

const meta: Meta<typeof Default> = {
  argTypes: {},
  component: Default,
  decorators: [
    (Story) => (
      <div className="max-w-[450px]">
        <Story />
      </div>
    ),
  ],
  title: 'Components/Authorable/shared/hztl-page-content/Card',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Card: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardProps)} />;
  },
};

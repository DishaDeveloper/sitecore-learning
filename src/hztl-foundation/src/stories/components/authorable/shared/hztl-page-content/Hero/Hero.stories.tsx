// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import { Default, HeroProps } from 'components/authorable/shared/hztl-page-content/Hero';
import defaultData from './Hero.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/shared/hztl-page-content/Hero',
  component: Default,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Hero: Story = {
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return <Default {...(expandedArgs as unknown as HeroProps)} />;
  },
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...flattenObj(defaultData as any),
  },
};

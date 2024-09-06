// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import { Default, CardListProps } from 'components/authorable/shared/hztl-page-content/CardList';
import defaultData from './CardList.mock-data';

const meta: Meta<CardListProps> = {
  argTypes: {},
  component: Default,
  title: 'Components/Authorable/shared/hztl-page-content/Card List',
};

export default meta;

type Story = StoryObj<CardListProps>;

export const CardList: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
};

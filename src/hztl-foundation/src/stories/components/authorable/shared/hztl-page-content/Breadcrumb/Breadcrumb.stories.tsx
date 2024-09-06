// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { flattenObj } from 'lib/object-parser';

// Local
import defaultData from './Breadcrumb.mock-data';
import { Default } from 'components/authorable/shared/hztl-page-content/Breadcrumb/Breadcrumb';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/shared/hztl-page-content/Breadcrumb',
  component: Default,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Breadcrumb: Story = {
  render: () => {
    return <Default {...defaultData} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import { Default, LegalInfoProps } from 'components/authorable/shared/hztl-page-content/LegalInfo';
import defaultData from './Legal-Info.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/shared/hztl-page-content/Legal-Info',
  component: Default,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Default>;

export const LegalInfo: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as LegalInfoProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

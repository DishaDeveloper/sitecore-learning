// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import {
  Default,
  SocialMediaProps,
} from 'components/authorable/shared/hztl-page-content/SocialMedia';
import defaultData from './SocialMedia.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/shared/hztl-page-content/SocialMedia',
  component: Default,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Default>;

export const SocialMedia: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as SocialMediaProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

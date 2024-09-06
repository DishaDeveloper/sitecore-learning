/* eslint-disable prettier/prettier */
// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import {
  Default,
  FooterProps,
} from 'components/authorable/shared/site-structure/SiteFooter/Footer';
import defaultData from './Footer.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/shared/site-structure/Footer',
  component: Default,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Footer: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as FooterProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

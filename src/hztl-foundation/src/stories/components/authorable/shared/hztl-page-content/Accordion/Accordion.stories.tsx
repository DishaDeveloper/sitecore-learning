/* eslint-disable prettier/prettier */
// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';
import '../../../../../page.css';

// Local
import {
  Default,
  AccordionProps,
} from 'components/authorable/shared/hztl-page-content/AccordionItem';
import defaultData from './Accordion.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/shared/hztl-page-content/Accordion',
  component: Default,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Accordion: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as AccordionProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

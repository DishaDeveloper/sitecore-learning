/* eslint-disable prettier/prettier */
// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';
import '../../../../../page.css';

// Local
import {
  Default,
  CarouselItemProps,
} from 'components/authorable/shared/hztl-page-content/CarouselItem';
import defaultData from './Carousel.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/shared/hztl-page-content/Carousel',
  component: Default,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Carousel: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CarouselItemProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};


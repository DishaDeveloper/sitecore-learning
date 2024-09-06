/* eslint-disable prettier/prettier */
// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Local
import defaultData from './Header.mock-data';
import { Default } from 'components/authorable/shared/site-structure/SiteHeader/Header';
import { HeaderProps } from 'components/authorable/shared/site-structure/SiteHeader/headerInterface';

const queryClient = new QueryClient();

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/shared/site-structure/Header',
  component: Default,
  argTypes: {},
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Header: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as HeaderProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

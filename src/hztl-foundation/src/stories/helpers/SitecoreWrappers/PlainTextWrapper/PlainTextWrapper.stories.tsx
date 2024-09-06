// Global
import type { Meta, StoryObj } from '@storybook/react';
import { TextProps } from '@sitecore-jss/sitecore-jss-react/types/components/Text';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import defaultData from './PlainTextWrapper.mock-data';

const meta: Meta<typeof PlainTextWrapper> = {
  title: 'Helpers/Sitecore Wrappers/Plain Text Wrapper',
  component: PlainTextWrapper,
  argTypes: {
    editable: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof PlainTextWrapper>;

export const Default: Story = {
  render: (args) => {
    return <PlainTextWrapper {...(expandObj({ ...args }) as TextProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

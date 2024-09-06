// Global
import type { Meta, StoryObj } from '@storybook/react';
import { RichTextProps } from '@sitecore-jss/sitecore-jss-nextjs/types/components/RichText';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import defaultData from './RichTextWrapper.mock-data';

const meta: Meta<typeof RichTextWrapper> = {
  title: 'Helpers/Sitecore Wrappers/Rich Text Wrapper',
  component: RichTextWrapper,
  argTypes: {
    editable: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof RichTextWrapper>;

export const Default: Story = {
  render: (args) => {
    return <RichTextWrapper {...(expandObj({ ...args }) as RichTextProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

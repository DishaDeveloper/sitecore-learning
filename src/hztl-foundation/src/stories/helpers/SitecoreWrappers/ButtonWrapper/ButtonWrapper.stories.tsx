// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import ButtonWrapper, {
  ButtonWrapperProps,
} from 'helpers/SitecoreWrappers/ButtonWrapper/ButtonWrapper';
import defaultData, {
  disabledData,
  styleLinkData,
  styleSecondaryData,
  styleTertiaryData,
} from './ButtonWrapper.mock-data';

const meta: Meta<ButtonWrapperProps> = {
  argTypes: {
    className: { description: 'Can be used to apply custom Tailwind CSS selectors to a link.' },
    ctaIconAlignment: {
      defaultValue: 'right',
      description: "The alignment parameter for the button's icon.",
    },
    disabled: { defaultValue: false, description: 'The enabled/disabled flag for the button.' },
    id: { description: 'The unique identifier for the link.' },
    onClick: { description: 'The handler function for the "onClick" event.' },
    ctaVariant: {
      control: 'select',
      defaultValue: 'primary',
      description: 'The variant of the button.',
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
    text: { description: 'The text for the link.' },
    title: { description: 'The title for the link.' },
    type: {
      control: 'select',
      defaultValue: 'button',
      description: 'The type of button.',
      options: ['button', 'reset', 'submit'],
    },
  },
  parameters: { controls: { sort: 'requiredFirst' } },
  tags: ['autodocs'],
  title: 'Helpers/Sitecore Wrappers/Button Wrapper',
};

export default meta;

type Story = StoryObj<ButtonWrapperProps>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Primary (Default)',
  render: (args) => {
    return <ButtonWrapper {...expandObj({ ...args })} />;
  },
};

export const Secondary: Story = {
  args: {
    ...flattenObj(styleSecondaryData),
  },
  render: (args) => {
    return <ButtonWrapper {...expandObj({ ...args })} />;
  },
};

export const Tertiary: Story = {
  args: {
    ...flattenObj(styleTertiaryData),
  },
  render: (args) => {
    return <ButtonWrapper {...expandObj({ ...args })} />;
  },
};

export const Disabled: Story = {
  args: {
    ...flattenObj(disabledData),
  },
  render: (args) => {
    return <ButtonWrapper {...expandObj({ ...args })} />;
  },
};

export const Link: Story = {
  args: {
    ...flattenObj(styleLinkData),
  },
  render: (args) => {
    return <ButtonWrapper {...expandObj({ ...args })} />;
  },
};

// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper, { LinkWrapperProps } from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import defaultData, { emailLink, externalLink, linkWithChildren } from './LinkWrapper.mock-data';

const meta: Meta<LinkWrapperProps> = {
  argTypes: {
    children: {
      control: 'select',
      mapping: {
        Image: (
          <ImageWrapper
            field={{
              value: {
                alt: 'A picture of a series of mountains saved in the WebP image format.',
                height: '184',
                src: 'https://placehold.co/275x184',
                width: '275',
              },
            }}
            layout="intrinsic"
            sizes=""
          />
        ),
      },
      options: ['Image'],
    },
    className: { description: 'Can be used to apply custom Tailwind CSS selectors to a link.' },
    editable: { control: 'boolean' },
    field: { table: { disable: true } },
    'field.value.href': {
      description: 'The URI for the link.',
      optional: false,
    },
    'field.value.linktype': {
      control: 'select',
      options: ['external'],
    },
    'field.value.target': {
      control: 'select',
      description: 'The target for the link.',
      options: ['_blank', '_self', '_parent', '_top'],
    },
    'field.value.text': { description: 'The text for the link.' },
    'field.value.title': { description: 'The title for the link.' },
    showLinkTextWithChildrenPresent: { control: 'boolean' },
    srOnlyText: {
      description:
        'Can be used to set text to be specifically and only available to assistive technologies.',
    },
    suppressNewTabIcon: {
      control: 'boolean',
      defaultValue: true,
      description:
        'Can be used to suppress the icon that indicates a link will open in a new browser tab.',
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  parameters: { controls: { sort: 'requiredFirst' } },
  tags: ['autodocs'],
  title: 'Helpers/Sitecore Wrappers/Link Wrapper',
};

export default meta;

type Story = StoryObj<typeof LinkWrapper>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};

export const EmailLink: Story = {
  args: {
    ...flattenObj(emailLink),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};

export const ExternalLink: Story = {
  args: {
    ...flattenObj(externalLink),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};

export const LinkWithChildren: Story = {
  args: {
    ...flattenObj(linkWithChildren),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};

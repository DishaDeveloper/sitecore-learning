// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import InlineVideo, {
  InlineVideoProps,
} from 'components/authorable/shared/hztl-page-content/InlineVideo';
import defaultData from './InlineVideo.mock-data';

const meta: Meta<InlineVideoProps> = {
  argTypes: {
    'fields.Video.value.autoplay': {
      description: 'A flag indicating wether or not the video should begin playing automatically.',
      name: 'autoplay',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.captions': {
      description:
        'An array of URIs indicating localized caption data to be loaded into the player.',
      name: 'captions',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.controls': {
      defaultValue: true,
      description: 'A flag indicating wether or not to show the playback controls.',
      name: 'controls',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.fluid': {
      description:
        "A flag indicating wether or not the player will size to fit its container at the video's intrinsic aspect ratio.",
      name: 'fluid',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.height': {
      description: 'A value indicating the desired height of the video player.',
      if: { arg: 'fields.Video.value.fluid', truthy: false },
      name: 'height',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.loop': {
      defaultValue: false,
      description:
        'A flag indicating wether or not the video will loop automatically once playback has ended.',
      name: 'loop',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.muted': {
      defaultValue: false,
      description: 'A flag indicated wether or not the video player is muted.',
      name: 'muted',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.poster': {
      defaultValue: false,
      description:
        'A URI represenging a poster image of the video asset to be loaded into the player.',
      name: 'poster',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.sources': {
      description:
        'An array of URIs and asset types representing a video asset to be loaded into the player.',
      name: 'sources',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.subtitles': {
      description:
        'An array of URIs indicating localized caption data to be loaded into the player.',
      name: 'subtitles',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    'fields.Video.value.width': {
      description: 'A value indicating the desired height of the video player.',
      if: { arg: 'fields.Video.value.fluid', truthy: false },
      name: 'width',
      table: {
        category: 'fields',
        subcategory: 'Video',
      },
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  component: InlineVideo,
  title: 'Components/Authorable/Shared/hztl-page-content/Inline Video',
};

export default meta;

type Story = StoryObj<InlineVideoProps>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <InlineVideo {...(expandObj({ ...args }) as InlineVideoProps)} />;
  },
};

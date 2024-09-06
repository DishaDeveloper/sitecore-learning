// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import VideoWrapper, { VideoWrapperProps } from 'helpers/GenericWrappers/VideoWrapper/VideoWrapper';
import defaultData, {
  videoWithA11yFeatures,
  videoWithYouTubeSource,
} from './VideoWrapper.mock-data';

const meta: Meta<VideoWrapperProps> = {
  argTypes: {
    autoplay: {
      defaultValue: false,
      description: 'A flag indicating wether or not the video should begin playing automatically.',
    },
    captions: {
      description:
        'An array of URIs indicating localized caption data to be loaded into the player.',
    },
    controls: {
      defaultValue: true,
      description: 'A flag indicating wether or not to show the playback controls.',
    },
    fluid: {
      description:
        "A flag indicating wether or not the player will size to fit its container at the video's intrinsic aspect ratio.",
    },
    height: {
      description: 'A value indicating the desired height of the video player.',
      if: { arg: 'fluid', truthy: false },
    },
    loop: {
      defaultValue: false,
      description:
        'A flag indicating wether or not the video will loop automatically once playback has ended.',
    },
    muted: {
      defaultValue: false,
      description: 'A flag indicated wether or not the video player is muted.',
    },
    poster: {
      description:
        'A URI represenging a poster image of the video asset to be loaded into the player.',
    },
    sources: {
      description:
        'An array of URIs and asset types representing a video asset to be loaded into the player.',
    },
    subtitles: {
      description:
        'An array of URIs indicating localized caption data to be loaded into the player.',
    },
    width: {
      description: 'A value indicating the desired height of the video player.',
      if: { arg: 'fluid', truthy: false },
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  component: VideoWrapper,
  parameters: { controls: { sort: 'requiredFirst' } },
  tags: ['autodocs'],
  title: 'Helpers/Generic Wrappers/Video Wrapper',
};

export default meta;

type Story = StoryObj<VideoWrapperProps>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <VideoWrapper {...expandObj({ ...args })} />;
  },
};

export const VideoWithA11yFeatures: Story = {
  args: {
    ...flattenObj(videoWithA11yFeatures),
  },
  name: 'Video with A11y Features',
  render: (args) => {
    return <VideoWrapper {...expandObj({ ...args })} />;
  },
};

export const VideoWithYouTubeSource: Story = {
  args: {
    ...flattenObj(videoWithYouTubeSource),
  },
  name: 'Video with YouTube Source',
  render: (args) => {
    return <VideoWrapper {...expandObj({ ...args })} />;
  },
};

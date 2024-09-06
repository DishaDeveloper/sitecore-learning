// Global
import { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import ImageWrapper, {
  ImageWrapperProps,
} from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';

import defaultData, { intrinsicData, responsiveData } from './ImageWrapper.mock-data';

const meta: Meta<typeof ImageWrapper> = {
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'field.value.alt': {
      description: 'Alternative text for the image.',
    },
    'field.value.height': {
      description:
        'Using layout="intrinsic" or layout="fixed", the height prop refers to the rendered height value in pixels. This will affect how large the image appears.<br /><br />Using layout="responsive" or layout="fill", the height prop refers to the image\'s original height in pixels, so this will affect the aspect ratio (i.e. how scaled the image is in relation to its container).',
    },
    'field.value.src': {
      description: 'The URI for the image asset.',
    },
    'field.value.width': {
      description:
        'Using layout="intrinsic" or layout="fixed", the width prop refers to the rendered width value in pixels. This will affect how large the image appears.<br /><br />Using layout="responsive" or layout="fill", the width prop refers to the image\'s original width in pixels, so this will affect the aspect ratio (i.e. how scaled the image is in relation to its container).',
    },
    layout: {
      control: 'select',
      defaultValue: 'intrinsic',
      description:
        "<ol><li>```intrinsic``` - default value for the layout prop. Gives the image enough space to render using its _original_ width and height dimension.</li><li>```fixed``` - sizes the image to fit the exact ```width``` and ```height``` props values. Generates a ```srcSet``` with pixel density descriptors of 1x and 2x.</li><li>```fill``` - causes an image to expand in _width_ and _height_ to fill its parent element's width and height. Ensure you add ```position: relative``` to the parent element. This value is usually used with the ```objectFit``` property and is recommended for images in which you don't know their sizes in advance. </li><li>```responsive``` - scales the image to fit the _width_ of its parent container. Ensure you add ```display: block``` to the parent container.</li></ol>",
      options: ['fill', 'fixed', 'intrinsic', 'responsive'],
    },
    priority: {
      defaultValue: false,
      description:
        'Wether or not the image is lazily loaded. Should generally only be used on images that appear "above the fold."',
    },
    quality: {
      defaultValue: 75,
      description:
        'An integer that specifies the quality of the optimized image. Its values range between ```1``` and ```100``` where ```100``` is the best quality.',
    },
    sizes: {
      description:
        'A string, similar to a media query, that provides information about how wide the image will be at different breakpoints. Applies only when ```layout``` is "fill" or "responsive."',
    },
  },
  component: ImageWrapper,
  tags: ['autodocs'],
  title: 'Helpers/Sitecore Wrappers/Image Wrapper',
};

export default meta;

type Story = StoryObj<typeof ImageWrapper>;

export const Fill: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  render: (args) => {
    return (
      <div className="aspect-picture w-full">
        <ImageWrapper {...(expandObj({ ...args }) as unknown as ImageWrapperProps)} />
      </div>
    );
  },
};

export const Intrinsic: Story = {
  args: {
    ...flattenObj(intrinsicData),
  },
  render: (args) => {
    return <ImageWrapper {...(expandObj({ ...args }) as unknown as ImageWrapperProps)} />;
  },
};

export const Responsive: Story = {
  args: {
    ...flattenObj(responsiveData),
  },
  render: (args) => {
    return (
      <div className="w-full xl:w-2/6 md:w-3/6">
        <ImageWrapper {...(expandObj({ ...args }) as unknown as ImageWrapperProps)} />
      </div>
    );
  },
};

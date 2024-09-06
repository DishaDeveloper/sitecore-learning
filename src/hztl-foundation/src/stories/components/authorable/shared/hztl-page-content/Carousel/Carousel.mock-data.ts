/* eslint-disable prettier/prettier */
import { CarouselProps } from 'components/authorable/shared/hztl-page-content/Carousel';

const defaultData: CarouselProps = {
  rendering: { componentName: 'Default', dataSource: 'Storybook' },
  params: {
    DynamicPlaceholderId: '1',
    FieldNames: 'Default',
  },
  fields: {
    description: {
      value: 'Description Lorem Ipsum',
    },
    image: {
      value: {
        src: 'https://edge.sitecorecloud.io/horizontald8261-xmchztlfounf6cb-dev-2730/media/Project/HztlFoundation/SiteAlpha/placeholder_gray_16by9.png?h=1080&iar=0&w=1920',
        alt: 'carousel img',
        width: '1920',
        height: '1080',
      },
    },
    primaryCTA: {
      value: {
        text: 'Home',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
        href: '/',
      },
    },
    secondaryCTA: {
      value: {
        text: 'Card',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{3677269A-E29B-4802-8C2A-4611C266DFD8}',
        href: '/Card-Page',
      },
    },
    title: {
      value: 'Header Lorem Ipsum',
    },
  },
};

export default defaultData;


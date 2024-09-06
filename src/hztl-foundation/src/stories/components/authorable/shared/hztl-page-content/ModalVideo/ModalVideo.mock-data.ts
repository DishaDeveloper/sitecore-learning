import { ModalVideoProps } from 'components/authorable/shared/hztl-page-content/ModalVideo';

const defaultData: ModalVideoProps = {
  fields: {
    Modal: {
      value: {
        content: undefined,
        id: '2845070A-AEBD-4B45-A59D-88269B081204',
        label: 'Modal',
        openOnLoad: false,
        size: 'large',
        title: 'Modal with Video',
        trigger: 'Button',
      },
    },
    Video: {
      value: {
        autoplay: false,
        captions: [],
        controls: true,
        fluid: true,
        height: 'auto',
        loop: false,
        muted: false,
        poster: './assets/videos/oceans.png',
        sources: [
          {
            src: './assets/videos/oceans.mp4',
            type: 'video/mp4',
          },
        ],
        subtitles: [],
        width: '600px',
      },
    },
  },
  params: {
    DynamicPlaceholderId: '12',
    FieldNames: 'Default',
    GridParameters: 'basis-full',
  },
  rendering: { componentName: 'Default', dataSource: 'Storybook' },
};

export const noData = {
  params: [],
  rnder: {},
};

export default defaultData;

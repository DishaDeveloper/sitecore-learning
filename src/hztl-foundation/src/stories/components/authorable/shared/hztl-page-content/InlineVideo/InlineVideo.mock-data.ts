import { InlineVideoProps } from 'components/authorable/shared/hztl-page-content/InlineVideo';

const defaultData: InlineVideoProps = {
  fields: {
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

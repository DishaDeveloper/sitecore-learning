import { LegalInfoProps } from 'components/authorable/shared/hztl-page-content/LegalInfo';

const defaultData: LegalInfoProps = {
  rendering: { componentName: 'Default', dataSource: 'Storybook' },
  params: {},
  fields: {
    copyrightText: {
      value: 'Copyright lorem ipsum',
    },
    legalMenu: [
      {
        name: 'Legal Link1',
        displayName: 'Legal link1',
        fields: {
          legalLink: {
            value: {
              text: 'Legal link1',
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
        },
      },
      {
        name: 'Legal link2',
        displayName: 'Legal link2',
        fields: {
          legalLink: {
            value: {
              text: 'Legal link2',
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
        },
      },
      {
        name: 'Legal link3',
        displayName: 'Legal link3',
        fields: {
          legalLink: {
            value: {
              text: 'Legal link3',
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
        },
      },
      {
        name: 'Legal link4',
        displayName: 'Legal link4',
        fields: {
          legalLink: {
            value: {
              text: 'Legal link4',
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
        },
      },
    ],
  },
};

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;

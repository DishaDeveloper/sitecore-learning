import { BreadcrumbDataType } from 'components/authorable/shared/hztl-page-content/Breadcrumb/Breadcrumb.types';

// Realistically this is going to have a lot more data from Sitecore or XM Cloud, but this is a good example mock data set.
const defaultData: BreadcrumbDataType = {
  rendering: {
    uid: 'f29a1f60-e8b8-446d-ab82-f56bca7201f2',
    componentName: 'Default',
    dataSource: 'Storybook',
    params: {
      GridParameters: 'col-12',
      FieldNames: 'Default',
      DynamicPlaceholderId: '1',
    },
  },
  staticProps: {
    currentPage: {
      Title: {
        jsonValue: {
          value: 'Accordion',
        },
      },
      pageUrl: {
        link: '/accordion-page',
      },
      disabledLinkNames: {
        names: [],
        pageUrl: {
          link: '',
        },
      },
      ancestors: [
        {
          Title: {
            jsonValue: {
              value: 'Home',
            },
          },
          pageUrl: {
            link: '/',
          },
          disabledLinkNames: {
            names: [],
            pageUrl: {
              link: '',
            },
          },
        },
      ],
    },
  },
};

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;

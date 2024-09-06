import { LayoutServicePageState, SitecoreContextState } from '@sitecore-jss/sitecore-jss-nextjs';

export const mockSitecoreContext: SitecoreContextState = {
  context: {
    pageEditing: false,
    site: {
      name: 'HztlFoundation',
    },
    pageState: LayoutServicePageState.Normal,
    language: 'en',
    itemPath: '/',
    route: {
      name: '',
      placeholders: {},
      fields: {},
    },
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setContext: () => {
    return; //nothing
  },
};

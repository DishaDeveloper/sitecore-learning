import { HeroProps } from 'components/authorable/shared/hztl-page-content/Hero';

const defaultData: HeroProps = {
  rendering: { componentName: 'Default', dataSource: 'Storybook' },
  params: {
    Styles:
      'cta1:ctaVariant:primary cta1:ctaIcon:arrow-right cta1:ctaIconAlignment:right cta2:ctaVariant:secondary cta2:ctaIcon:download cta2:ctaIconAlignment:left ',
  },
  fields: {
    Image: {
      value: {
        src: 'https://edge.sitecorecloud.io/horizontald8261-xmchztlfounf6cb-dev-2730/media/Project/HztlFoundation/SiteAlpha/placeholder_gray_4by3.png?h=600&iar=0&w=800',
        alt: 'placeholder_gray_4by3',
        width: '800',
        height: '600',
      },
    },
    Description: {
      value:
        '<span style="color: #27272a; background-color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>',
    },
    Heading: {
      value: 'Experience Forward',
    },
    cta1Link: {
      value: {
        text: 'Primary button',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: 'cta1 title',
        target: '',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
        href: '/',
      },
    },
    cta2Link: {
      value: {
        text: 'Secondary buttton',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: 'cta2 title',
        target: '',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
        href: '/',
      },
    },
  },
};

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-onboarding',
    '@whitespace/storybook-addon-html',
  ],
  docs: {
    autodocs: 'tag',
  },
  env: (config) => ({
    ...config,
    IS_STORYBOOK: 'true',
  }),
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public', '../src/stories/assets'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
};

export default config;

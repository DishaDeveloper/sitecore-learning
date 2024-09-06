// Global
import type { Preview } from '@storybook/react';

// Local
import { componentGlobalWrapper, i18nWrapper } from './decorators';
import 'assets/app.css';
import './storybook-override.css';

const preview: Preview = {
  parameters: {
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
    tags: ['autodocs'],
    html: {
      prettier: {
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: 'ignore',
      },
      highlighter: {
        showLineNumbers: true,
        wrapLines: false,
      },
    },
  },
  tags: ['autodocs'],
};

export const decorators = [componentGlobalWrapper, i18nWrapper];

export default preview;

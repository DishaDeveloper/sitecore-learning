// Global
import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreContextReactContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { Decorator } from '@storybook/react';
import { I18nProvider, I18n } from 'next-localization';

// Lib
import { componentBuilder } from '../src/temp/componentBuilder';
import { mockSitecoreContext } from '../src/lib/testing/mocks';

export const componentGlobalWrapper: Decorator = (Story) => (
  <SitecoreContext componentFactory={componentBuilder.getComponentFactory({ isEditing: false })}>
    <Story />
  </SitecoreContext>
);

export const i18nWrapper: Decorator = (Story) => {
  // Since we don't have a Sitecore dictionary in Storybook, use a proxy dictionary that just returns the property name.
  const dictionaryProxy = new Proxy(
    {},
    {
      get(_obj, name) {
        console.log('obj', _obj, 'name', name);
        return name;
      },
    }
  );

  // We're overriding the `set` function to not use `Object.assign` because that would break the proxy
  const tree = {};
  const i18n = I18n(tree);
  i18n.set = (lang, table) => {
    tree[lang] = table;
  };

  return (
    <I18nProvider lngDict={dictionaryProxy} locale="en" i18nInstance={i18n}>
      <Story />
    </I18nProvider>
  );
};

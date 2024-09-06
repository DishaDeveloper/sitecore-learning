/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';
import jssConfig from 'src/temp/config';
import { Environment, PageController, WidgetsProvider } from '@sitecore-search/react';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  Content?: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  // Fetching the whole URL for the og:url
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  PageController.getContext().setLocaleLanguage('en');
  PageController.getContext().setLocaleCountry('us');

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        {fields?.Title?.value && (
          <meta content={fields?.Content?.value?.toString()} name="description" />
        )}
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
        {currentUrl && <meta content={currentUrl} property="og:url" />}
      </Head>

      <WidgetsProvider
        apiKey={jssConfig.sitecoreSearchApiKey}
        customerKey={jssConfig.sitecoreSearchCustomerKey}
        env={jssConfig.sitecoreSearchEnv as Environment}
        publicSuffix={true}
      >
        {/* root placeholder for the app, which we add components to using route data */}
        <div className={mainClassPageEditing}>
          {/* Header component */}
          {route && <Placeholder name="headless-header" rendering={route} />}
          <main>
            <div id="content" className="mt-xl md:mt-xxl">
              {route && <Placeholder name="headless-main" rendering={route} />}
            </div>
          </main>
          <footer>
            <div id="footer" className="bg-mild-gray">
              <div className="grid grid-cols-2 w-full">
                {route && <Placeholder name="headless-footer" rendering={route} />}
              </div>
            </div>
          </footer>
        </div>
      </WidgetsProvider>
    </>
  );
};

export default Layout;

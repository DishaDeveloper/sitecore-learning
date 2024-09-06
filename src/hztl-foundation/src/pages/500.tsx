import Head from 'next/head';
import { SitecoreContext, ErrorPages, LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import Layout from 'src/Layout';
import { componentBuilder } from 'temp/componentBuilder';
import { useState, useEffect } from 'react';

/**
 * Rendered in case if we have 500 error
 */
const ServerError = (): JSX.Element => (
  <>
    <Head>
      <title>500: Server Error</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>500 Internal Server Error</h1>
      <p>There is a problem with the resource you are looking for, and it cannot be displayed.</p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

const Custom500 = (): JSX.Element => {
  const [layoutData, setLayoutData] = useState<LayoutServiceData>();
  const [fetchError, setFetchError] = useState(false);

  // We need to fetch the 500 page content client-side because NextJS doesn't provide the ability
  // to determine which site we're on due to middleware rewrites not executing for the 500 handler.
  useEffect(() => {
    // Only execute if we didn't get data from the default.
    // Depending on requirements, we may want to always fetch.
    if (!layoutData) {
      fetch('/api/error/content')
        .then(async (res) => {
          const data = (await res.json()) as ErrorPages | null;

          if (data?.serverErrorPage.rendered) {
            // Render the server error page
            setLayoutData(data?.serverErrorPage.rendered);
          } else {
            // There was no custom error page, render the fallback.
            setFetchError(true);
          }
        })
        .catch(() => {
          // There was an error, render the fallback.
          setFetchError(true);
        });
    }
    // We can't use layout data as a dependency because we are updating it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only render the fallback if there was an error fetching the data
  if (fetchError) {
    return <ServerError />;
  }
  // If data hasn't been fetched yet, don't render anything.
  if (!layoutData) {
    return <></>;
  }

  return (
    <SitecoreContext
      componentFactory={componentBuilder.getComponentFactory()}
      layoutData={layoutData}
    >
      <Layout layoutData={layoutData} headLinks={[]} />
    </SitecoreContext>
  );
};

export default Custom500;

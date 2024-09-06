import { LayoutServiceData, ErrorPages, SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from 'src/Layout';
import { componentBuilder } from 'temp/componentBuilder';

interface ErrorPageProps {
  statusCode?: number | null | undefined;
}

const ServerError = ({ statusCode }: { statusCode?: number | null }) => (
  <>
    <Head>
      <title>Error</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>An error occurred</h1>
      <p>
        {statusCode
          ? `A server-side ${statusCode} error occurred.`
          : 'A client-side error occurred.'}
      </p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

/**
 * Rendered for 500 errors on both server and client. Used only in Production mode.
 * @link https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing
 */
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  const [layoutData, setLayoutData] = useState<LayoutServiceData | undefined>();
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
    return <ServerError statusCode={statusCode} />;
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

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;

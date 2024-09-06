import { SitecoreContext, ErrorPages, LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import NotFound from 'src/NotFound';
import { componentBuilder } from 'temp/componentBuilder';
import Layout from 'src/Layout';
import { useEffect, useState } from 'react';

const Custom404 = (): JSX.Element => {
  const [layoutData, setLayoutData] = useState<LayoutServiceData>();
  const [fetchError, setFetchError] = useState(false);

  // We need to fetch the 404 page content client-side because NextJS doesn't provide the ability
  // to determine which site we're on due to middleware rewrites not executing for the 404 handler.
  useEffect(() => {
    // Only execute if we didn't get data from the default.
    // Depending on requirements, we may want to always fetch.
    if (!layoutData) {
      fetch('/api/error/content')
        .then(async (res) => {
          const data = (await res.json()) as ErrorPages | null;

          if (data?.notFoundPage.rendered) {
            // Render the not found page
            setLayoutData(data?.notFoundPage.rendered);
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
    return <NotFound />;
  }
  // If data hasn't been fetched yet, don't render anything.
  if (!layoutData) {
    return <></>;
  }

  // We now have data, so render the error page normally.
  return (
    <SitecoreContext
      componentFactory={componentBuilder.getComponentFactory()}
      layoutData={layoutData}
    >
      <Layout layoutData={layoutData} headLinks={[]} />
    </SitecoreContext>
  );
};

export default Custom404;

import { GraphQLErrorPagesService } from '@sitecore-jss/sitecore-jss-nextjs';
import { siteResolver } from 'lib/site-resolver';
import { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';

import clientFactory from 'lib/graphql-client-factory';

/**
 * Gets the ErrorPages content.  We have to fetch via API to be able to get site-specific content.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const domain = req.headers.host;
  let siteName;
  try {
    const site = siteResolver.getByHost(domain ?? '');
    siteName = site.name;
  } catch {
    siteName = config.sitecoreSiteName;
  }
  const errorPagesService = new GraphQLErrorPagesService({
    clientFactory,
    siteName: siteName,
    language: (req.headers.locale as string) ?? config.defaultLanguage,
    retries:
      (process.env.GRAPH_QL_SERVICE_RETRIES &&
        parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) ||
      0,
  });

  try {
    const resultErrorPages = await errorPagesService.fetchErrorPages();

    // It's important that we cache the requests to prevent DDOS via 404 page

    // NOTE: "max-age" with a dash and "s-maxage" without a dash is correct.  Not sure who decided to spec it that way.
    // Cache settings for Vercel and potentially other CDNs
    res.setHeader('CDN-Cache-Control', `s-maxage=${60 * 60}, stale-while-revalidate=59`);

    // Cache settings for the browser.
    res.setHeader('Cache-Control', `max-age=${60 * 60}, stale-while-revalidate=59`);

    res.status(200).json(resultErrorPages);
  } catch (error) {
    console.error('Error occurred while fetching error pages');
    console.error(error);

    res.status(500).json({ message: 'An error occured' });
  }
}

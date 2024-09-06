import {
  SearchResponseFacet,
  SearchResultsInitialState,
  useSearchResultsSelectedFilters,
} from '@sitecore-search/react';
import { SearchResultsWidget } from '@sitecore-search/react/dist/esm/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export type SearchResultStoreSelectedFacets =
  SearchResultsInitialState<'selectedFacets'>['selectedFacets'];

export const useEnsureFacetUrl = (
  actions: SearchResultsWidget['ActionProps'],
  facets: SearchResponseFacet[]
) => {
  const router = useRouter();

  const selectedFacetsFromApi = useSearchResultsSelectedFilters();
  const selectedFacetsFromApiUrl = decodeURI(facetToUrl(selectedFacetsFromApi));
  const [prevFacetUrl, setPrevFacetUrl] = useState<string>();

  useEffect(() => {
    if (prevFacetUrl === undefined) {
      setPrevFacetUrl(router.asPath.split('#')[1] ?? '');
    } else {
      if (prevFacetUrl !== selectedFacetsFromApiUrl) {
        setPrevFacetUrl(selectedFacetsFromApiUrl);
        //searchParams.get('q')
        router.push(
          {
            pathname: window.location.pathname,
            // window.location.search includes the '?' if there is a querystring.
            // This caused extra '?' to be added each time.
            // If there is no querystring, there is no '?' so this issue wasn't caught earlier.
            query: window.location.search.replace(/^\?/, ''),
            hash: selectedFacetsFromApiUrl,
          },
          undefined,
          { scroll: false }
        );
      }
    }
  }, [actions, facets, prevFacetUrl, router, selectedFacetsFromApiUrl]);
};

const FACET_PREFIX = 'f-';

type FacetValue = {
  facetId: string;
  valueLabel?: string;
  facetValueText?: string;
};

function facetToUrl(selectedFacets: FacetValue[]) {
  if (!selectedFacets.length) {
    return '';
  }
  const facets: Record<string, string> = {};
  selectedFacets.forEach((facet) => {
    // Depending on when it's called, sometimes it comes as facet.valueLabel, other times it's facet.facetValueText
    const value = facet.valueLabel ?? facet.facetValueText;
    if (!value) {
      return;
    }
    const key = FACET_PREFIX + facet.facetId;
    if (!facets[key]) {
      facets[key] = '';
    } else {
      facets[key] += '|';
    }
    facets[key] += value;
  });
  const params = new URLSearchParams(facets);

  return params.toString();
}

export function urlToFacet(hash: string) {
  const query = new URLSearchParams('?' + hash);
  const facets: FacetValue[] = [];

  for (const [key, value] of query.entries()) {
    if (!key.startsWith(FACET_PREFIX)) {
      continue;
    }
    const facetId = key.split(FACET_PREFIX)[1];
    const valueArray = value.split('|');
    valueArray.forEach((x) => {
      facets.push({ facetId, facetValueText: x });
    });
  }
  return facets;
}

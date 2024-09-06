import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useEnsureSearchUrl = (commitedSearchText: string) => {
  const router = useRouter();

  useEffect(() => {
    if (commitedSearchText) {
      const quearySearch = 'q=' + commitedSearchText;
      router.push(
        {
          pathname: window.location.pathname,
          query: quearySearch,
          hash: '',
        },
        undefined,
        { scroll: false }
      );
    }
  }, [commitedSearchText]);
};

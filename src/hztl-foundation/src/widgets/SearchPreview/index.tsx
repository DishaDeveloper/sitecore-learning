// This template was generated by @sitecore-search/cli on Tue Jul 23 2024 14:56:02 GMT+0000 (Coordinated Universal Time)

import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { ArticleCard, Presence, PreviewSearch } from '@sitecore-search/ui';
import { useEnsureSearchUrl } from './use-ensure-search-url';
import { useRouter } from 'next/router';
import { SvgIcon } from 'helpers/SvgIconWrapper';

type ArticleModel = {
  id: string;
  name: string;
  image_url: string;
  url: string;
  source_id?: string;
  title: string;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage'>;

const DEFAULT_IMG_URL = 'https://placehold.co/500x300?text=No%20Image';

export const PreviewSearchBasicComponent = ({
  defaultItemsPerPage = 6,
  hasSearchFromSearchPage = false,
}) => {
  const {
    widgetRef,
    actions: { onKeyphraseChange },
    queryResult,
    queryResult: { isFetching, isLoading },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
  });

  const loading = isLoading || isFetching;

  const router = useRouter();

  //State related to search
  const [searchText, setSearchText] = useState<string>('');
  const [commitedSearchText, setCommitedSearchText] = useState<string>('');

  //Generic onKeyphrase method
  const onKeyPhrase = (searchKeyword?: string) => {
    onKeyphraseChange({
      keyphrase: searchKeyword || '',
    });
  };

  //This hook is responsible for set search default value when component reload
  useEffect(() => {
    const hasWindow = window;
    if ((hasWindow && hasWindow.location.pathname.toLocaleLowerCase()) == '/search') {
      router?.query?.q && setSearchText(router?.query?.q as string);
      //Added as if user change search queary from URL then search preview showing correct search result otherwise default one
      onKeyPhrase((router?.query?.q && (router?.query?.q as string)) || '');
    } else {
      setSearchText('');
    }
  }, [router]);

  const routePushToSearch = (pathName: string, queary: string, hash: string) => {
    router.push(
      {
        pathname: pathName,
        query: queary,
        hash: hash,
      },
      undefined,
      { scroll: false }
    );
  };

  const onResetText = () => {
    routePushToSearch(window.location.pathname, '', '');
    setSearchText('');
    setCommitedSearchText('');
    onKeyPhrase();
  };

  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      setSearchText(target.value);
      onKeyPhrase(target.value);
    },
    [onKeyphraseChange]
  );

  const onShowMoreResult = () => {
    if (hasSearchFromSearchPage) {
      setCommitedSearchText(searchText);
    } else {
      routePushToSearch('search', 'q=' + searchText, '');
    }
  };

  const onHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasSearchFromSearchPage) {
      setCommitedSearchText(searchText);
      onKeyPhrase(searchText);
    } else {
      routePushToSearch('search', 'q=' + searchText, '');
    }
  };

  useEnsureSearchUrl(commitedSearchText);

  return (
    <PreviewSearch.Root>
      <div className="search-container w-full flex">
        <div className="searchinput relative w-[85%]">
          <form id="searchSubmit" onSubmit={onHandle}>
            <PreviewSearch.Input
              id="keyword"
              className="w-full box-border py-2 px-2 focus:outline-solid focus:outline-1 focus:outline-gray-500 border-1"
              onChange={keyphraseHandler}
              autoComplete="off"
              placeholder="Search"
              value={searchText}
            />
          </form>
          {searchText && (
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={onResetText}
            >
              <SvgIcon size="xs" viewBox="0 0 12 12" fill="none" icon="close" />
            </div>
          )}
        </div>
        <div
          onClick={onShowMoreResult}
          className="magnifier-search flex justify-center w-[15%] border-l-0 border-x border-y mx-auto items-center cursor-pointer"
        >
          <SvgIcon icon="magnifier" size="xs" viewBox="0 0 18 18" fill="none" />
        </div>
      </div>

      <PreviewSearch.Content
        ref={widgetRef}
        className="flex justify-center pt-0 shadow-[2px_5px_5px_5px_rgba(0,0,0,0.3)] transition-opacity	w-[var(--radix-popover-trigger-width)] bg-white z-10"
      >
        <Presence present={loading}>
          <div className="flex flex-1 items-center">
            <svg
              aria-busy={loading}
              aria-hidden={!loading}
              focusable="false"
              role="progressbar"
              viewBox="0 0 20 20"
              className="block fill-red-600 m-auto h-[50px] w-[50px] animate-spin"
            >
              <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
            </svg>
          </div>
        </Presence>
        <Presence present={!loading}>
          <PreviewSearch.Results defaultQueryResult={queryResult}>
            {({ isFetching: loading, data: { content: articles = [] } = {} }) => (
              <PreviewSearch.Items
                style={{}}
                data-loading={loading}
                className="flex flex-col w-full"
              >
                <Presence present={loading}>
                  <div className="flex flex-1 items-center">
                    <svg
                      aria-busy={loading}
                      aria-hidden={!loading}
                      focusable="false"
                      role="progressbar"
                      viewBox="0 0 20 20"
                      className="block h-[50px] m-auto w-[50px] fill-red-600 animate-spin"
                    >
                      <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                    </svg>
                  </div>
                </Presence>
                {!loading && (
                  <>
                    {articles.map((article) => (
                      <PreviewSearch.Item key={article.id} asChild>
                        <a
                          href={article.url}
                          className="flex flex-col box-border no-underline w-full text-black"
                        >
                          <div className="p-2">
                            <ArticleCard.Root className="flex w-full p-2 cursor-pointer gap-x-2">
                              <div className="search-content space-y-2 w-3/4">
                                <ArticleCard.Title className="w-full overflow-hidden text-base font-normal">
                                  {'Item Label'}
                                </ArticleCard.Title>
                                <ArticleCard.ArticleCardContent className="w-full overflow-hidden text-[12px] font-normal">
                                  {article.title || 'Title'}
                                </ArticleCard.ArticleCardContent>
                              </div>
                              <div className=" relative h-[6em] flex justify-center items-center overflow-hidden">
                                <ArticleCard.Image
                                  src={article.image_url || DEFAULT_IMG_URL}
                                  className="block w-[24px] h-[24px]"
                                />
                              </div>
                            </ArticleCard.Root>
                          </div>
                        </a>
                      </PreviewSearch.Item>
                    ))}
                    {/* {articles.length > 0 && hasShowMoreFunc && (
                      <PreviewSearch.Item asChild>
                        <ArticleCard.Root
                          onClick={onShowMoreResult}
                          className="flex w-full p-2 cursor-pointer"
                        >
                          <div className="search-content gap-y-2 w-3/4 ms-2">
                            <ArticleCard.Title className="w-full overflow-hidden text-base">
                              {'Show all results'}
                            </ArticleCard.Title>
                          </div>
                        </ArticleCard.Root>
                      </PreviewSearch.Item>
                    )} */}
                  </>
                )}
              </PreviewSearch.Items>
            )}
          </PreviewSearch.Results>
        </Presence>
      </PreviewSearch.Content>
    </PreviewSearch.Root>
  );
};
const PreviewSearchBasicWidget = widget(
  PreviewSearchBasicComponent,
  WidgetDataType.PREVIEW_SEARCH,
  'content'
);
export default PreviewSearchBasicWidget;
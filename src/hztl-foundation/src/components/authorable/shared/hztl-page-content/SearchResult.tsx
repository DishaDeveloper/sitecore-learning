import React from 'react';
import { HztlPageContent } from '../../../../.generated/Feature.HztlFoundation.model';
import { ComponentProps } from 'lib/component-props';
import SearchResultsWidget from 'src/widgets/SearchResult';
import { useSearchParams } from 'next/navigation';

export type SearchResultProps = ComponentProps & HztlPageContent.SearchResult;

export const Default = (props: SearchResultProps): JSX.Element => {
  const useKeyphrase = (): string => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    return searchQuery;
  };
  const id = props?.params?.RenderingIdentifier;
  return (
    <div className={`component w-full mb-4 ${props?.params?.styles}`} id={id ? id : undefined}>
      <SearchResultsWidget
        rfkId="rfkid_102"
        defaultKeyphrase={useKeyphrase()}
        key={`${useKeyphrase()}-search`}
      />
    </div>
  );
};

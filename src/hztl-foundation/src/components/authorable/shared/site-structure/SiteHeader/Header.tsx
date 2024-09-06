// Global
import { useEffect, useState } from 'react';
import { GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';

// Lib
import { useMediaQuery } from 'src/hooks/useMediaQuery';
import graphqlClientFactory from 'lib/graphql-client-factory';

// Local
import { HeaderProps } from './headerInterface';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import HeaderQuery from './Header.graphql';

export const Default = (props: HeaderProps) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const defaultCountry =
    props?.HeaderData?.item?.country?.targetItems?.[0]?.language?.jsonValue?.name;
  useEffect(() => {
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    }
  }, [defaultCountry]);

  const isDesktop = useMediaQuery('(min-width: 992px)');

  /*
   * Rendering
   */

  if (!props) {
    return <></>;
  }

  return (
    <header>
      {!isDesktop ? (
        <HeaderMobile
          {...props}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      ) : (
        <HeaderDesktop
          {...props}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      )}
    </header>
  );
};

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  const graphQLClient = graphqlClientFactory({});
  const result = await graphQLClient.request<unknown>(HeaderQuery, {
    datasource: rendering.dataSource,
    params: rendering.params,
    language: layoutData?.sitecore?.context?.language,
    itemID: layoutData?.sitecore?.route?.itemId,
  });
  return { HeaderData: result };
};

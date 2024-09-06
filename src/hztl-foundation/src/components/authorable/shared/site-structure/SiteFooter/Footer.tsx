// Global
import React from 'react';
import {
  GetStaticComponentProps,
  ImageFieldValue,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { tv } from 'tailwind-variants';

// Lib
import { SiteStructure } from 'src/.generated/Feature.HztlFoundation.model';
import { ComponentProps } from 'lib/component-props';
import graphQLClientFactory from 'lib/graphql-client-factory';

// Local
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import FooterQuery from './Footer.graphql';

// Types
interface LinkItem {
  id: string;
  name: string;
  link: {
    jsonValue: LinkField;
  };
}

interface FooterColumn {
  id: string;
  name: string;
  columnLinks: {
    items: LinkItem[];
  };
}

interface FooterLogo {
  jsonValue: {
    value: ImageFieldValue;
  };
  alt: string;
}

interface Item {
  id: string;
  path: string;
  footerLogo: FooterLogo;
  footerColumns: {
    items: FooterColumn[];
  };
}

/*
 * Tailwind Variants
 */

const tailwindVariants = tv({
  slots: {
    base: ['col-span-2'],
    container: ['m-auto max-w-screen-xl'],
    wrapper: ['w-full', 'py-10', 'px-spacing-spacing-4', 'ml:px-20'],
    content: [
      'flex',
      'flex-wrap',
      'justify-start',
      'md:justify-between',
      'gap-xl',
      'sm:gap-l',
      'md:gap-l',
      'md:w-auto',
    ],
    contentWrapper: ['w-full mmd:w-fit'],
    section: [
      'flex',
      'justify-between',
      'flex-wrap',
      'gap-m',
      'sm:gap-ml',
      'mmd:gap-xl',
      'mml:gap-xl',
      'md:w-auto',
    ],
    column: [''],
    textWrapper: [
      'font-modern',
      'text-black',
      'text-xs',
      'font-bold',
      'capitalize',
      'pt-1.5',
      'pb-3',
    ],
    menuList: ['flex', 'flex-col'],
    menuItem: ['p-2'],
    linkWrapper: ['font-modern', 'text-black text-xs', 'font-bold', 'capitalize', 'py-2'],
    divider: ['w-full', 'bg-color-grayscale-base-black', 'opacity-100'],
  },
});

export type FooterProps = ComponentProps &
  SiteStructure.Footer.Footer & { FooterData: { item: Item } };

export const Default = (props: FooterProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  const { item } = props?.FooterData;
  const footerColumns = item?.footerColumns.items;
  const footerLogo = item?.footerLogo;

  const {
    base,
    container,
    wrapper,
    content,
    contentWrapper,
    column,
    textWrapper,
    menuList,
    menuItem,
    linkWrapper,
    divider,
  } = tailwindVariants();

  /*
   * Rendering
   */

  if (!item) {
    return <></>;
  }

  return (
    <div
      className={`${base()} ${props?.params?.styles !== undefined ? props?.params?.styles : ''}`}
      id={id}
    >
      <div data-component="authorable/general/footer">
        <div className={container()}>
          <div className={wrapper()}>
            <div className={content()}>
              <div className={contentWrapper()}>
                <ImageWrapper field={{ value: footerLogo?.jsonValue.value }} />
              </div>
              {footerColumns?.map((groupLabel, index) => {
                const links = groupLabel?.columnLinks?.items;
                return (
                  <React.Fragment key={index}>
                    <div className={column()}>
                      <RichTextWrapper
                        className={textWrapper()}
                        tag="h3"
                        field={{ value: groupLabel?.name }}
                      />
                      <ul className={menuList()}>
                        {links?.map((link, index) => (
                          <li className={menuItem()} key={index}>
                            <LinkWrapper className={linkWrapper()} field={link?.link?.jsonValue} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <hr className={divider()} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  const graphQLClient = graphQLClientFactory({});
  const result = await graphQLClient.request<unknown>(FooterQuery, {
    datasource: rendering.dataSource,
    params: rendering.params,
    language: layoutData?.sitecore?.context?.language,
    itemID: layoutData?.sitecore?.route?.itemId,
  });
  return { FooterData: result };
};

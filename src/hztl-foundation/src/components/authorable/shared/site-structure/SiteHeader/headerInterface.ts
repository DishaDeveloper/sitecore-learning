import { ComponentProps } from 'lib/component-props';
import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { SiteStructure } from 'src/.generated/Feature.HztlFoundation.model';

export interface MegaMenuLinkInterface {
  id: string;
  url: string;
  name: string;
  displayName: string;
  link: { jsonValue: LinkField };
}

export interface MegaMenuCategoryInterface {
  id: string;
  url: string;
  name: string;
  displayName: string;
  megaMenuTitle: {
    jsonValue: {
      value: string;
    };
  };
  megaMenuLinks: { items: MegaMenuLinkInterface[] };
}

export interface NavigationItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  megaMenuList: { items: MegaMenuCategoryInterface[] };
  navigationLink: { jsonValue: LinkField };
  navigationTitle: {
    jsonValue: {
      value: string;
    };
  };
}
export interface HeaderCountry {
  name: string;
  flag: {
    jsonValue: ImageField;
  };
  language: {
    jsonValue: {
      id: string;
      url: string;
      name: string;
      displayName: string;
      fields: {
        [key: string]: {
          value: string;
        };
      };
    };
    targetItem?: {
      name: {
        jsonValue: {
          value: string;
        };
      };
    } | null;
  };
}

export interface CountrySelectorInterface {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  countryData?: HeaderCountry[];
}

export type HeaderProps = ComponentProps & {
  HeaderData: {
    item: {
      logo: { jsonValue: ImageField };
      logoLink: { jsonValue: LinkField };
      navigationList: { items: NavigationItem[] };
      country: { targetItems: HeaderCountry[] };
    };
  };
} & SiteStructure.Header.Header;

export type HeaderPropsComponent = HeaderProps & CountrySelectorInterface;

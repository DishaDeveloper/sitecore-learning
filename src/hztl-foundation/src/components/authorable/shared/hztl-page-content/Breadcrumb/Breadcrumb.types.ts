import { ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type BreadcrumbDataType = {
  rendering: ComponentRendering;
  staticProps: {
    currentPage: BreadcrumbInfo & {
      ancestors: BreadcrumbInfo[];
    };
  };
};

export type BreadcrumbInfo = {
  disabledLinkNames: NavLinks;
  pageUrl: {
    link: string;
  };
  Title: {
    jsonValue: Field<string>;
  };
};

export type NavFilter = {
  field: {
    disabled: Field<string>;
  };
};

export type NavLinks = {
  names: NavFilter[];
  pageUrl: {
    link: string;
  };
};

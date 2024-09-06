import { keyframes, styled } from 'styled-components';

import {
  AccordionFacets,
  ArticleCard,
  FacetItem,
  Pagination,
  SearchResultsAccordionFacets,
  Select,
  SortSelect,
  theme,
} from '@sitecore-search/ui';

const selectTriggerStyle = `
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${theme.vars.spacing.xs};
  background-color: transparent;
  height: 40px;
  padding: ${theme.vars.spacing.xs} ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  border: none;
  &:focus {
    outline: none;
  }
`;

const SortSelectTriggerStyled = styled(SortSelect.Trigger)`
  ${selectTriggerStyle}
`;

const GenericSelectTriggerStyled = styled(Select.Trigger)`
  ${selectTriggerStyle}
`;

const contentSelectStyle = `
  background-color: ${theme.vars.palette.primary.contrastText};
  position: relative;
  overflow: hidden;
  box-shadow: 2px 2px 4px ${theme.vars.palette.grey['400']};
  position: absolute;
  top: 30px;
  z-index: 100;
  &:focus-within {
    border-color: ${theme.vars.palette.primary.dark};
  }
`;

const SortSelectContentStyled = styled(SortSelect.Content)`
  ${contentSelectStyle}
`;

const GenericSelectContentStyled = styled(Select.SelectContent)`
  ${contentSelectStyle}
`;

const viewportSelectStyles = `
  padding: ${theme.vars.spacing.xs};
  z-index: 50000;
`;

const SortSelectViewportStyled = styled(SortSelect.Viewport)`
  ${viewportSelectStyles}
`;

const GenericSelectViewportStyled = styled(Select.Viewport)`
  ${viewportSelectStyles}
`;

const optionSelectStyles = `
  display: flex;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0 ${theme.vars.spacing.xs};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  position: relative;
  border-radius: 0px;

  &[data-highlighted] {
    border-radius: 0;
    background-color: ${theme.vars.palette.primary.dark};
    color: ${theme.vars.palette.primary.contrastText};
  }
  &[data-disabled] {
    color: ${theme.vars.palette.grey['800']};
    font-style: italic;
  }

   &[data-state=checked] {
    color: ${theme.vars.palette.primary.main};
    background-color: ${theme.vars.palette.common.white};
  }
`;

const SortSelectOptionStyled = styled(SortSelect.Option)`
  ${optionSelectStyles}
`;

const GenericSelectOptionStyled = styled(Select.SelectItem)`
  ${optionSelectStyles}
`;

const SortSelectValueStyled = styled(SortSelect.SelectValue)`
  color: ${theme.vars.palette.primary.main};
`;

const GenericSelectValueStyled = styled(Select.SelectValue)`
  color: ${theme.vars.palette.primary.main};
`;

const SortSelectIconStyled = styled(SortSelect.Icon)``;

const GenericSelectIconStyled = styled(Select.Icon)``;

const SortSelectOptionTextStyled = styled(SortSelect.OptionText)``;
const GenericSelectOptionTextStyled = styled(SortSelect.OptionText)``;

export const SortSelectStyled = {
  Trigger: SortSelectTriggerStyled,
  Content: SortSelectContentStyled,
  Viewport: SortSelectViewportStyled,
  Option: SortSelectOptionStyled,
  SelectValue: SortSelectValueStyled,
  OptionText: SortSelectOptionTextStyled,
  Icon: SortSelectIconStyled,
};

export const SelectStyled = {
  Trigger: GenericSelectTriggerStyled,
  Icon: GenericSelectIconStyled,
  SelectValue: GenericSelectValueStyled,
  Content: GenericSelectContentStyled,
  Viewport: GenericSelectViewportStyled,
  Option: GenericSelectOptionStyled,
  OptionText: GenericSelectOptionTextStyled,
};

const ArticleRootStyled = styled(ArticleCard.Root)`
  display: flex;
  box-sizing: border-box;
  position: relative;
  padding: ${theme.vars.spacing.m};
  margin-top: ${theme.vars.spacing.m};
  margin-bottom: ${theme.vars.spacing.m};
  flex-direction: row;
  flex-wrap: nowrap;
  border: ${theme.vars.border.width} solid ${theme.vars.palette.grey[400]};
  border-radius: ${theme.vars.border.radius};
  width: 100%;
  max-height: 200px;

  &:focus-within {
    border: solid 1px ${theme.vars.palette.primary.main};
  }
  &:hover {
    transition-property: all;
    transition-timing-function: linear;
    transition-duration: 300ms;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    transform: scaleX(1.05) scaleY(1.05);
  }
`;

const ArticleTitleStyled = styled(ArticleCard.Title)`
  margin: 0 0 ${theme.vars.spacing.s};
  color: ${theme.vars.palette.text.primary};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  font-weight: ${theme.vars.typography.fontSize4.fontWeight};
  line-height: ${theme.vars.typography.fontSize4.lineHeight};
`;

const ArticleSubtitle = styled(ArticleCard.Subtitle)`
  color: ${theme.vars.palette.text.secondary};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize3.fontSize};
  font-weight: ${theme.vars.typography.fontSize3.fontWeight};
  line-height: ${theme.vars.typography.fontSize3.lineHeight};
  margin: 0 0 ${theme.vars.spacing.s};
`;

const ArticleImageWrapper = styled.div`
  overflow: hidden;
  flex: none;
  width: 25%;
`;
const ArticleImageStyled = styled(ArticleCard.Image)`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
`;

const ArticleContentStyled = styled(ArticleCard.Content)`
  padding-left: ${theme.vars.spacing.m};
  flex-direction: column;
`;

const ArticleSpan = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ArticleContentTextStyled = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: ${theme.vars.typography.fontSize};
  line-height: 1.25rem;
`;

const ArticleIdStyled = styled(ArticleCard.Id)`
  font-family: ${theme.vars.typography.fontFamilySystem};
  color: ${theme.vars.palette.primary.main};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`;

const ArticleLinkStyled = styled.a`
  text-decoration: none;
  color: ${theme.vars.palette.primary.main};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`;

export const ArticleCardStyled = {
  Link: ArticleLinkStyled,
  Id: ArticleIdStyled,
  Content: ArticleContentStyled,
  Title: ArticleTitleStyled,
  Root: ArticleRootStyled,
  Image: ArticleImageStyled,
  Text: ArticleContentTextStyled,
  ImageWrapper: ArticleImageWrapper,
  Span: ArticleSpan,
  Subtitle: ArticleSubtitle,
};

const AccordionItemCheckboxStyled = styled(AccordionFacets.ItemCheckbox)`
  all: unset;
  background-color: white;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  flex: none;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &[data-state='checked'] {
    color: ${theme.vars.palette.primary.contrastText};
    background-color: ${theme.vars.palette.primary.main};
  }

  &:focus {
    border: solid 1px ${theme.vars.palette.primary.main};
  }
`;

const AccordionItemToggleStyled = styled(AccordionFacets.ItemToggle)`
  all: unset;
  width: 40px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  margin-right: ${theme.vars.spacing.s};

  &:focus {
    border: solid 1px ${theme.vars.palette.primary.main};
  }

  &[data-state='on'] {
    background-color: ${theme.vars.palette.primary.main};
    color: ${theme.vars.palette.primary.contrastText};
  }
`;

const AccordionItemCheckboxIndicatorStyled = styled(AccordionFacets.ItemCheckboxIndicator)`
  color: ${theme.vars.palette.primary.contrastText};
  width: 15px;
  height: 15px;
`;

const AccordionValueListStyled = styled(AccordionFacets.ValueList)`
  list-style: none;
  padding: 0;
  li {
    padding: ${theme.vars.spacing.xs} 0;
    font-family: ${theme.vars.typography.fontFamilySystem};
    font-size: ${theme.vars.typography.fontSize};
  }

  &[data-orientation='horizontal'] {
    display: flex;
    flex-direction: row;
  }
`;

const AccordionItemCheckboxLabelStyled = styled(AccordionFacets.ItemLabel)`
  padding-left: ${theme.vars.spacing.m};
`;

const AccordionItemStyled = styled(FacetItem)`
  display: flex;
  align-items: center;
`;

const AccordionHeaderStyled = styled(AccordionFacets.Header)`
  display: flex;
  margin: 0;
`;
const AccordionTriggerStyled = styled(AccordionFacets.Trigger)`
  align-items: center;
  display: flex;
  color: ${theme.vars.palette.text.primary};
  font-size: ${theme.vars.typography.fontSize3.fontSize};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-weight: 600;
  padding: 0;
  justify-content: space-between;
  line-height: 1;
  flex: 1 1 0;
  background: none;
  border: none;
`;

const AccordionFacetsFacetStyled = styled(AccordionFacets.Facet)`
  border-bottom: solid 1px ${theme.vars.palette.grey['800']};
  margin-bottom: ${theme.vars.spacing.m};
  padding-bottom: ${theme.vars.spacing.m};
`;

const AccordionFacetsContentStyled = styled(AccordionFacets.Content)``;

const AccordionFacetsRootStyled = styled(SearchResultsAccordionFacets)``;

export const AccordionFacetsStyled = {
  Trigger: AccordionTriggerStyled,
  Header: AccordionHeaderStyled,
  Item: AccordionItemStyled,
  ItemCheckboxLabel: AccordionItemCheckboxLabelStyled,
  ValueList: AccordionValueListStyled,
  ItemCheckboxIndicator: AccordionItemCheckboxIndicatorStyled,
  ItemToggle: AccordionItemToggleStyled,
  ItemCheckbox: AccordionItemCheckboxStyled,
  Facet: AccordionFacetsFacetStyled,
  Root: AccordionFacetsRootStyled,
  Content: AccordionFacetsContentStyled,
};

const paginationLinkStyle = `
  cursor: pointer;
  color: ${theme.vars.palette.text.primary};
  margin: 0 5px;
  text-decoration: none;

  &:hover {
    color: ${theme.vars.palette.primary.main};
  }

  &[data-current='true'] {
    color: ${theme.vars.palette.primary.main};
    pointer-events: none;
    text-decoration-line: none;
  }
`;

const paginationNavigationLinkStyle = `
  ${paginationLinkStyle}
  &[data-current='true'] {
    display: none;
  }
`;

const PaginationRootStyled = styled(Pagination.Root)`
  color: ${theme.vars.palette.text.primary};
  font-family: ${theme.vars.typography.fontFamilySystem};
  display: flex;
  margin-top: ${theme.vars.spacing.m};
`;
const PaginationPrevPageStyled = styled(Pagination.PrevPage)`
  ${paginationNavigationLinkStyle}
`;
const PaginationNextPageStyled = styled(Pagination.NextPage)`
  ${paginationNavigationLinkStyle}
`;
const PaginationFirstPageStyled = styled(Pagination.FirstPage)`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  ${paginationNavigationLinkStyle}
`;
const PaginationLastPageStyled = styled(Pagination.LastPage)`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  ${paginationLinkStyle}
`;
const PaginationPageStyled = styled(Pagination.Page)`
  cursor: pointer;
  ${paginationLinkStyle}
`;
const PaginationPagesStyled = styled(Pagination.Pages)``;

export const PaginationStyled = {
  Root: PaginationRootStyled,
  PrevPage: PaginationPrevPageStyled,
  NextPage: PaginationNextPageStyled,
  FirstPage: PaginationFirstPageStyled,
  LastPage: PaginationLastPageStyled,
  Page: PaginationPageStyled,
  Pages: PaginationPagesStyled,
};

const Wrapper = styled.div``;

const MainArea = styled.div`
  color: ${theme.vars.palette.text.primary};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize};
  padding: 0 ${theme.vars.spacing.m};
  display: flex;
  max-width: 100%;
  position: relative;
  padding: 0 ${theme.vars.spacing.m};
`;

const LeftArea = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: none;
  width: 25%;
  margin-right: ${theme.vars.spacing.l};
  margin-top: ${theme.vars.spacing.m};
`;

const RightArea = styled.section`
  display: flex;
  flex-direction: column;
  flex: 4 1 0%;
`;

const RightTopArea = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const GridStyled = styled.div`
  width: 100%;
`;

const ClearFilters = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-size: ${theme.vars.typography.fontSize};
  &:hover {
    color: ${theme.vars.palette.primary.main};
    cursor: pointer;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: ${theme.vars.spacing.m};
`;
const FilterHeaderContainer = styled.div`
  display: flex;
  margin-bottom: ${theme.vars.spacing.s};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const FilterHeader = styled.h3`
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-weight: 600;
  margin: 0;
`;

const SelectedFiltersList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SelectedFiltersListItem = styled.button`
  color: ${theme.vars.palette.common.white};
  cursor: pointer;
  background-color: ${theme.vars.palette.grey[600]};
  border: none;
  border-radius: ${theme.vars.border.radius};
  padding: ${theme.vars.spacing.s} 20px 6px ${theme.vars.spacing.s};
  margin: ${theme.vars.spacing.xs};
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  &::before {
    content: ' ';
    position: absolute;
    right: 5px;
    top: 50%;
    width: 10px;
    height: 2px;
    background: #fff;
    transform: rotate(-45deg);
  }
  &::after {
    content: ' ';
    position: absolute;
    right: 5px;
    top: 50%;
    width: 10px;
    height: 2px;
    background: #fff;
    transform: rotate(45deg);
  }
`;

export const PageControlsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`;

export const QuerySummaryStyled = styled.div`
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  font-weight: bold;
  margin: auto 0;
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  background-color: white;
  opacity: 0.5;
  z-index: 100;
`;

const Rotate = keyframes`
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`;

export const LoaderAnimation = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  display: block;
  fill: ${theme.vars.palette.primary.main};
  height: 50px;
  margin: auto;
  width: 50px;
`;

export const FiltersStyled = {
  Container: FilterContainer,
  HeaderContainer: FilterHeaderContainer,
  Header: FilterHeader,
  ClearFilters,
  SelectedFiltersList,
  SelectedFiltersListItem,
};

export const NoResults = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SearchResultsLayout = {
  Wrapper,
  MainArea,
  NoResults,
  LeftArea,
  RightArea,
  RightTopArea,
};

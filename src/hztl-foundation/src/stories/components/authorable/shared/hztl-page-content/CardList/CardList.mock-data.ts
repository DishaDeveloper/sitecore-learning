import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { CardListProps } from 'components/authorable/shared/hztl-page-content/CardList';
import {
  CardA,
  CardB,
  CardC,
} from 'stories/components/authorable/shared/hztl-page-content/Card/Card.mock-data';

const defaultData: CardListProps = {
  params: {
    cardsPerRow: '3',
    DynamicPlaceholderId: '1',
  },
  rendering: {
    componentName: 'Card List',
    dataSource: 'Storybook',
    placeholders: {
      'cardlist-1': [
        CardA as ComponentRendering,
        CardB as ComponentRendering,
        CardC as ComponentRendering,
      ],
    },
  },
};

export default defaultData;

// Global
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import { tv } from 'tailwind-variants';

// Lib
import { ComponentProps } from 'lib/component-props';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';

type ColCount = '1' | '2' | '3' | '4' | '5' | '6' | undefined;

export type CardListProps = ComponentProps;

const TAILWIND_VARIANTS = tv({
  defaultVariants: {
    colCount: '3',
  },
  slots: {
    base: ['component', 'gap-6', 'grid', 'grid-cols-none'],
  },
  variants: {
    colCount: {
      '1': { base: ['mml:grid-cols-1'] },
      '2': { base: ['mml:grid-cols-2'] },
      '3': { base: ['mml:grid-cols-3'] },
      '4': { base: ['mml:grid-cols-4'] },
      '5': { base: ['mml:grid-cols-5'] },
      '6': { base: ['mml:grid-cols-6'] },
    },
  },
});

const CardList = (props: CardListProps): JSX.Element => {
  const { DynamicPlaceholderId, RenderingIdentifier, cardsPerRow } = props?.params || {};

  const { base } = TAILWIND_VARIANTS({ colCount: cardsPerRow as ColCount });

  const placeholderKey = `cardlist-${DynamicPlaceholderId}`;

  /*
   * Rendering
   */

  return (
    <div
      className={base()}
      data-component="authorable/shared/hztl-page-content/cardlist"
      id={RenderingIdentifier}
    >
      <Placeholder name={placeholderKey} rendering={props.rendering} />
    </div>
  );
};

export const Default = withStandardComponentWrapper(CardList, false);

// Global
import React from 'react';
import { tv } from 'tailwind-variants';

// Lib
import { HztlPageContent } from '../../../../.generated/Feature.HztlFoundation.model';
import { ComponentProps } from 'lib/component-props';
import { parseStyleParams } from 'lib/utils/style-param-utils';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';

/*
 * Tailwind Variants
 */

const tailwindVariants = tv({
  slots: {
    base: ['border', 'border-dark-gray', 'flex', 'flex-col', 'items-center', 'justify-center'],
    body: ['flex', 'flex-col', 'gap-l', 'grow', 'p-l', 'w-full'],
    content: ['grow', 'w-full'],
    ctaPrimary: [
      'bg-gray',
      'flex',
      'font-bold',
      'font-modern',
      'items-center',
      'justify-center',
      'px-s',
      'py-xs',
      'rounded',
      'text-button',
      'text-center',
      'text-white',
    ],
    ctaSecondary: [
      'border-gray',
      'border',
      'flex',
      'font-bold',
      'font-modern',
      'items-center',
      'justify-center',
      'p-xs',
      'rounded',
      'text-black',
      'text-center',
      'text-xs',
    ],
    description: ['font-modern', 'font-regular', 'mb-xxs', 'opacity-90', 'text-black', 'text-xs'],
    eyebrow: ['font-modern', 'font-regular', 'mb-xxs', 'opacity-80', 'text-black', 'text-xxs'],
    footer: ['flex', 'flex-wrap', 'gap-xxs', 'justify-normal', 'w-full'],
    header: ['border-b', 'border-dark-gray'],
    heading: ['font-bold', 'font-modern', 'mb-xxs', 'text-4xl', 'text-black'],
    subheading: ['font-bold', 'font-modern', 'mb-xxs', 'opacity-80', 'text-black', 'text-m'],
  },
});

export type CardProps = ComponentProps &
  HztlPageContent.Card & { componentName?: string; dataSource?: string; uid: string };

const Card = (props: CardProps): JSX.Element => {
  const { CardImage, CardLink1, CardLink2, Description, Eyebrow, Heading, Subheading } =
    props?.fields || {};
  const { RenderingIdentifier } = props?.params || {};

  const styles = parseStyleParams(props.params, ['cta1', 'cta2']);

  const {
    base,
    body,
    content,
    ctaPrimary,
    ctaSecondary,
    description,
    eyebrow,
    footer,
    header,
    heading,
    subheading,
  } = tailwindVariants();

  /*
   * Rendering
   */

  if (!props?.fields) {
    return <></>;
  }

  return (
    <div
      className={base()}
      data-component="authorable/shared/hztl-page-content/card"
      id={RenderingIdentifier}
    >
      <div className={header()}>
        <ImageWrapper field={CardImage} />
      </div>
      <div className={body()}>
        <div className={content()}>
          <PlainTextWrapper className={eyebrow()} editable field={Eyebrow} tag="h6" />
          <RichTextWrapper className={heading()} field={Heading} />
          <RichTextWrapper className={subheading()} field={Subheading} />
          <RichTextWrapper className={description()} field={Description} />
        </div>
        <div className={footer()}>
          <LinkWrapper className={ctaPrimary()} ctaStyle={styles.cta1} field={CardLink1} />
          <LinkWrapper className={ctaSecondary()} ctaStyle={styles.cta2} field={CardLink2} />
        </div>
      </div>
    </div>
  );
};

export const Default = withStandardComponentWrapper(Card);

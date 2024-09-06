// Global
import { SplideSlide } from '@splidejs/react-splide';
import { tv } from 'tailwind-variants';
import '@splidejs/splide/css';

// Lib
import { ComponentProps } from 'lib/component-props';
import { parseStyleParams } from 'lib/utils/style-param-utils';

// Local
import { HztlPageContent } from 'src/.generated/Feature.HztlFoundation.model';
import { ItemEx } from '../../../../.generated/_.Sitecore.Override';
import { withStandardComponentWrapper } from 'helpers/HOC';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';

export type CarouselItemProps = ComponentProps & ItemEx & HztlPageContent.CarouselItem;

/*
 * Tailwind Variants
 */

const tailwindVariants = tv({
  slots: {
    base: [
      'relative',
      'py-m',
      'mmd:w-[85%]',
      'w-[80%]',
      'min-h-[500px]',
      'sm:h-auto',
      'mx-auto',
      'flex',
      'flex-col-reverse',
      'mmd:flex-row',
      'mmd:justify-center',
      'mmd:items-center',
      'items-start',
    ],
    wrapper: ['slide-content', 'flex-1'],
    content: ['slide-content-inner', 'flex', 'justify-center'],
    inner: ['relative', 'flex', 'flex-col', 'gap-s', 'p-6', 'w-auto'],
    heading: ['md:text-5xl', 'text-3xl', 'capitalize', 'font-bold'],
    description: ['text-xs', 'text-black'],
    ctaWrapper: ['flex'],
    ctaButtons: ['flex', 'md:flex-row', 'flex-col', 'gap-xs'],
    ctaButton1: [
      'w-32',
      'h-12',
      'rounded',
      'content-center',
      'text-center',
      'bg-gray',
      'text-white',
      'text-button',
      'font-bold',
    ],
    ctaButton2: [
      'w-32',
      'h-12',
      'rounded',
      'content-center',
      'text-center',
      'text-button',
      'font-bold',
      'border-1',
      'border-gray',
      'text-gray',
    ],
    slideMedia: ['slide-media', 'flex-1'],
  },
});

const CarouselItem = (props: CarouselItemProps): JSX.Element => {
  const {
    base,
    wrapper,
    content,
    inner,
    heading,
    description,
    ctaWrapper,
    ctaButtons,
    ctaButton1,
    ctaButton2,
    slideMedia,
  } = tailwindVariants();

  /*
   * Rendering
   */

  if (!props?.fields) {
    return <></>;
  }
  const styles = parseStyleParams(props.params, ['cta1', 'cta2']);
  return (
    <SplideSlide>
      <div className={base()}>
        {/* Slide Content. */}
        <div className={wrapper()}>
          <div className={content()}>
            <div className={inner()}>
              <PlainTextWrapper tag="h2" className={heading()} field={props?.fields?.title} />

              {/* Slide description. */}
              {props?.fields?.description && (
                <RichTextWrapper field={props?.fields?.description} className={description()} />
              )}

              {/* Slide links. */}
              {props?.fields?.primaryCTA && (
                <div className={ctaWrapper()}>
                  <div className={ctaButtons()}>
                    <LinkWrapper
                      field={props?.fields?.primaryCTA}
                      aria-label={props?.fields?.primaryCTA?.value.text}
                      className={ctaButton1()}
                      ctaStyle={styles.cta1}
                    ></LinkWrapper>
                    <LinkWrapper
                      field={props?.fields?.secondaryCTA}
                      aria-label={props?.fields?.secondaryCTA?.value.text}
                      className={ctaButton2()}
                      ctaStyle={styles.cta2}
                    ></LinkWrapper>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide media. */}
        <div className={slideMedia()}>
          <ImageWrapper field={props?.fields?.image} />
        </div>
      </div>
    </SplideSlide>
  );
};

export const Default = withStandardComponentWrapper(CarouselItem);

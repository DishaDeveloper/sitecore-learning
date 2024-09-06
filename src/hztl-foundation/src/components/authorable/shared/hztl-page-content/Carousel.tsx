// Global
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { Splide, SplideTrack } from '@splidejs/react-splide';
import { tv } from 'tailwind-variants';
import '@splidejs/splide/css';

// Lib
import { ComponentProps } from 'lib/component-props';

// Local
import { HztlPageContent } from '../../../../.generated/Feature.HztlFoundation.model';
import { SvgIcon } from 'helpers/SvgIconWrapper';
import { withStandardComponentWrapper } from 'helpers/HOC';

export type CarouselProps = ComponentProps & HztlPageContent.CarouselItem;

/*
 * Tailwind Variants
 */

const tailwindVariants = tv({
  slots: {
    base: ['component', 'relative'],
    slideArrows: ['splide__arrows'],
    previousButton: [
      'splide__arrow',
      'splide__arrow--prev',
      'icon-hover-focus-rounded',
      'stroke-gray',
      '!bg-transparent',
    ],
    nextButton: [
      'splide__arrow',
      'splide__arrow--next',
      'icon-hover-focus-rounded',
      'stroke-gray',
      '!bg-transparent',
    ],
    screenReader: ['sr-only'],
    progressBarWrapper: ['splide__progress'],
    progressBarItem: ['splide__progress__bar'],
    slideControls: ['absolute', 'bottom-1', 'right-5'],
    slideControlButton: ['splide__toggle', 'icon-hover-focus-rounded'],
    playButton: ['splide__toggle__play'],
    pauseButton: ['splide__toggle__pause'],
    iconStyles: ['h-l', 'w-l'],
  },
});

const Carousel = (props: CarouselProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  const phKey = `carousel-${props?.params?.DynamicPlaceholderId}`;

  const {
    base,
    slideArrows,
    previousButton,
    nextButton,
    screenReader,
    progressBarWrapper,
    progressBarItem,
    slideControls,
    slideControlButton,
    playButton,
    pauseButton,
    iconStyles,
  } = tailwindVariants();

  /*
   * Rendering
   */

  return (
    <div id={id ? id : undefined} className={base()}>
      <Splide
        hasTrack={false}
        options={{
          rewind: true,
          width: '100%',
          gap: '.01rem',
          perPage: 1,
          perMove: 1,
          pagination: true,
          autoplay: 'pause',
          interval: 3000,
        }}
      >
        <SplideTrack>
          <Placeholder name={phKey} rendering={props.rendering} />
        </SplideTrack>

        <div className={slideArrows()}>
          <button className={previousButton()}>
            <span className={screenReader()}>Previous slide</span>
            <SvgIcon icon={'arrow-right'} size="md" />
          </button>

          <button className={nextButton()}>
            <span className={screenReader()}>Next slide</span>
            <SvgIcon icon={'arrow-right'} size="md" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={progressBarWrapper()}>
          <div className={progressBarItem()} />
        </div>

        <div className={slideControls()}>
          <button className={slideControlButton()} type="button">
            {/* Play button */}
            <span className={playButton()}>
              <span className={screenReader()}>Play slideshow</span>
              <SvgIcon className={iconStyles()} icon={'play'} />
            </span>

            {/* Pause button */}
            <span className={pauseButton()}>
              <span className={screenReader()}>Pause slideshow</span>
              <SvgIcon className={iconStyles()} icon={'pause'} />
            </span>
          </button>
        </div>
      </Splide>
    </div>
  );
};

export const Default = withStandardComponentWrapper(Carousel, false);

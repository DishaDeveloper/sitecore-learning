import React from 'react';
// Helpers
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { ComponentProps } from 'lib/component-props';
import { HztlPageContent } from 'src/.generated/Feature.HztlFoundation.model';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { withStandardComponentWrapper } from 'helpers/HOC';

export type HeroProps = ComponentProps & HztlPageContent.Hero;

const Hero = (props: HeroProps): JSX.Element => {
  const styles = parseStyleParams(props.params, ['cta1', 'cta2']);

  return (
    <section className="component hero my-ml min-h-[50vh] flex flex-col-reverse md:flex-row justify-center items-center">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="max-w-[472px] w-fit px-s py-ml">
          <PlainTextWrapper
            tag="h2"
            className="font-modern text-l font-bold mb-6"
            field={props.fields?.Heading}
          />
          <RichTextWrapper
            tag="div"
            className="text-gray text-base mb-m"
            field={props.fields?.Description}
          />

          <div className="flex gap-xxs flex-wrap justify-center md:justify-normal">
            <LinkWrapper
              field={props.fields?.cta1Link}
              suppressNewTabIcon={true}
              ctaStyle={styles.cta1}
            />
            <LinkWrapper
              field={props.fields?.cta2Link}
              suppressNewTabIcon={true}
              ctaStyle={styles.cta2}
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <ImageWrapper field={props.fields?.Image} />
      </div>
    </section>
  );
};

export const Default = withStandardComponentWrapper(Hero);

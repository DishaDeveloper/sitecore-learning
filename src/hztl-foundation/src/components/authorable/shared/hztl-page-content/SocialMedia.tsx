// Global
import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { tv } from 'tailwind-variants';

// Lib
import { ComponentProps } from 'lib/component-props';
import { SiteStructure } from '../../../../.generated/Feature.HztlFoundation.model';

// Local
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';

// Types
export type SocialMediaProps = ComponentProps & SiteStructure.Footer.SocialMedia;

/*
 * Tailwind Variants
 */

const tailwindVariants = tv({
  slots: {
    base: ['flex', 'justify-end', 'col-span-2', 'mmd:col-span-1'],
    wrapper: [
      'w-full',
      'flex',
      'max-w-[724px]',
      'py-4',
      'px-spacing-spacing-4',
      'ml:px-16',
      'items-center',
      'justify-center',
      'mmd:justify-start',
    ],
    content: ['flex', 'gap-8'],
  },
});

export const Default = (props: SocialMediaProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;

  const { base, wrapper, content } = tailwindVariants();

  /*
   * Rendering
   */

  if (!props?.fields) {
    return <></>;
  }

  return (
    <div
      className={`${base()} ${props?.params?.styles !== undefined ? props?.params?.styles : ''}`}
      data-component="authorable/general/social-media"
      id={id}
    >
      <div className={wrapper()}>
        <div className={content()}>
          {props?.fields?.socialMediaLinks?.map((icon, index) => {
            const { socialMediaLink, socialMediaLogo } = icon?.fields;
            return (
              <LinkWrapper
                key={index}
                suppressNewTabIcon={true}
                field={socialMediaLink as LinkField}
              >
                <ImageWrapper field={socialMediaLogo as ImageField} />
              </LinkWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

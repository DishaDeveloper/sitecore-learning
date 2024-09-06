// GLobal
import { tv } from 'tailwind-variants';

// Lib
import { ComponentProps } from 'lib/component-props';
import { SiteStructure } from 'src/.generated/Feature.HztlFoundation.model';

// Local
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';

// Types
export type LegalInfoProps = ComponentProps & SiteStructure.Footer.LegalInfo;

/*
 * Tailwind Variants
 */

const tailwindVariants = tv({
  slots: {
    base: ['flex', 'justify-start', 'col-span-2', 'mmd:col-span-1'],
    wrapper: [
      'w-full',
      'flex',
      'max-w-[724px]',
      'py-4',
      'px-spacing-spacing-4',
      'items-center',
      'justify-center',
      'mmd:justify-end',
    ],
    content: [
      'flex',
      'flex-col',
      'gap-xxs',
      'text-center',
      'lg:text-left',
      'items-center',
      'ml:items-end',
    ],
    textWrapper: ['font-modern', 'text-black', 'text-xs', 'font-regular'],
    legalMenuWrapper: ['flex'],
    legalMenuItems: ['flex', 'items-center'],
    linkWrapper: [
      'p-xxs',
      'font-modern',
      'text-center',
      'text-black',
      'text-text-link',
      'font-bold',
    ],
    divider: ['h-ml w-px bg-black'],
  },
});

export const Default = (props: LegalInfoProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  const legalMenu = props?.fields?.legalMenu || [];

  const {
    base,
    wrapper,
    content,
    textWrapper,
    linkWrapper,
    legalMenuWrapper,
    legalMenuItems,
    divider,
  } = tailwindVariants();

  /*
   * Rendering
   */

  if (!props?.fields) {
    return <></>;
  }

  return (
    <div
      className={`${base()} ${props?.params?.styles !== undefined ? props?.params?.styles : ''}`}
      data-component="authorable/general/legal-info"
      id={id}
    >
      <div className={wrapper()}>
        <div className={content()}>
          <RichTextWrapper
            className={textWrapper()}
            field={props?.fields?.copyrightText}
            tag="div"
          />
          <div className={legalMenuWrapper()}>
            {props?.fields?.legalMenu?.map((navLink, index) => (
              <div key={index} className={legalMenuItems()}>
                <LinkWrapper
                  className={linkWrapper()}
                  field={{
                    ...navLink?.fields?.legalLink,
                  }}
                  suppressNewTabIcon={true}
                />
                {legalMenu?.length > index + 1 && <div className={divider()}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

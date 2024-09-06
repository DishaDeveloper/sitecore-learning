// Global
import { Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState } from 'react';
import { tv } from 'tailwind-variants';

// Lib
import { ComponentProps } from 'lib/component-props';
import { HztlPageContent } from '../../../../.generated/Feature.HztlFoundation.model';

// Local
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { withStandardComponentWrapper } from 'helpers/HOC';

export type AccordionProps = ComponentProps & HztlPageContent.AccordionItem;

const tailwindVariants = tv({
  slots: {
    base: ['border-t', 'border-solid', 'border-t-gray', 'overflow-hidden'],
    buttonWrapper: [
      'cursor-pointer',
      'duration-300',
      'flex',
      'font-bold',
      'items-center',
      'justify-between',
      'p-xs',
      'text-sub-heading',
      'w-full',
    ],
    contentContainer: ['flex-auto', 'min-h-px', 'p-xs'],
    icon: ['fa', 'fa-chevron-down'],
    iconWrapper: ['transform', 'transition-transform'],
    richTextWrapper: ['font-normal', 'mb-0', 'p-s', 'text-s'],
  },
  variants: {
    isOpen: {
      false: {
        iconWrapper: [],
      },
      true: {
        iconWrapper: ['rotate-180'],
      },
    },
  },
});

const AccordionItem = (props: AccordionProps): JSX.Element => {
  const { content, heading } = props?.fields || {};
  const { uid } = props?.rendering || {};

  const context = useSitecoreContext();

  /*
   * State
   */

  const [isOpen, setIsOpen] = useState(false);

  /*
   * Convenience Methods
   */

  const toggleAccordion = () => setIsOpen(!isOpen);

  /*
   * Rendering
   */

  if (!props?.fields) {
    return <></>;
  }

  const { base, buttonWrapper, icon, iconWrapper, contentContainer, richTextWrapper } =
    tailwindVariants({
      isOpen,
    });

  return (
    <div className={base()} data-component="authorable/shared/hztl-page-content/accordion">
      <div>
        <button
          aria-expanded={isOpen}
          className={buttonWrapper()}
          id={`accordion-${uid}`}
          onClick={toggleAccordion}
          type="button"
        >
          <Text field={heading} tag="h3" />
          <span className={iconWrapper()}>
            <i className={icon()} />
          </span>
        </button>
        {context?.sitecoreContext?.pageEditing ? (
          <div aria-labelledby={`accordion-${uid}`} className={contentContainer()} role="region">
            <RichTextWrapper aria-required={isOpen} className={richTextWrapper()} field={content} />
            {content?.value}
          </div>
        ) : (
          isOpen && (
            <div aria-labelledby={`accordion-${uid}`} className={contentContainer()} role="region">
              <RichTextWrapper
                aria-required={isOpen}
                className={richTextWrapper()}
                field={content}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export const Default = withStandardComponentWrapper(AccordionItem);

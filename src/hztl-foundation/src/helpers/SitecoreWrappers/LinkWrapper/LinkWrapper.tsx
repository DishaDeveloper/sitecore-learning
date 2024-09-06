// Global
import { sendGTMEvent } from '@next/third-parties/google';
import { Link, LinkProps, LinkField, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import NextLink from 'next/link';
import React, { forwardRef } from 'react';

// Lib
import useIsEditing from 'lib/hooks/use-is-editing';
import { GtmEvent } from 'lib/utils/gtm-utils';

import { CtaProps, ctaTailwindVariant } from '../ButtonWrapper/ButtonWrapper';
import { SvgIcon } from 'helpers/SvgIconWrapper';
import structuredClone from '@ungap/structured-clone';

export type LinkWrapperProps = Omit<LinkProps, 'field'> &
  CtaProps & {
    className?: string;
    field?: LinkField | LinkFieldValue;
    gtmEvent?: GtmEvent;
    ignoreEE?: boolean;
    srOnlyText?: string;
    suppressNewTabIcon?: boolean;
  };

const LinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  (
    {
      children,
      className,
      editable = true,
      field,
      gtmEvent,
      showLinkTextWithChildrenPresent = true,
      srOnlyText,
      suppressNewTabIcon,
      ctaStyle,
      ctaVariant,
      ctaIconAlignment,
      ctaIcon,
      ...props
    }: LinkWrapperProps,
    ref
  ): JSX.Element | null => {
    const isEditing = useIsEditing();

    if (!field) {
      return <></>;
    }

    ctaIcon = ctaIcon ?? ctaStyle?.ctaIcon;
    ctaVariant = ctaVariant ?? ctaStyle?.ctaVariant ?? 'link';
    ctaIconAlignment = ctaIconAlignment ?? ctaStyle?.ctaIconAlignment ?? 'right';

    // Clone the object so we don't modify the original.
    // This addresses some edge cases issues when the same link is rendered more than once
    // and we're modifying the link.  While it may not always be needed, it's safer to include
    const clonedField = structuredClone(field);

    // Standardize the field because it can either be LinkField or LinkFieldValue
    const fieldValue: LinkFieldValue = {
      ...((clonedField as LinkField)?.value ?? (clonedField as LinkFieldValue)),
    };

    const { href, anchor, querystring, target, title } = fieldValue;

    const text = !showLinkTextWithChildrenPresent && children ? '' : fieldValue.text;

    const { base, icon } = ctaTailwindVariant({
      className: className,
      iconAlignment: ctaIconAlignment,
      variant: ctaVariant,
    });

    /*
     * EVENT HANDLERS
     */

    const handleOnClick = () => {
      if (!field?.value) return;

      const gtmEventInner = {
        ...gtmEvent,
        'gtm.element.dataset.gtmLinkName': text || title,
        'gtm.element.dataset.gtmLinkUrl': href,
      };

      sendGTMEvent(gtmEventInner);
    };

    /*
     * RENDERING
     */

    if (isEditing && editable)
      return (
        // Adding the CSS classes to a wrapping div so we can include the icon
        <div className={`${base()} ${className ? className : ''}`}>
          <Link
            {...props}
            field={field}
            internalLinkMatcher={INTERNAL_LINK_REGEX}
            showLinkTextWithChildrenPresent={false}
            ref={ref}
          >
            {children}
          </Link>
          {/* When in edit mode we cannot render anything inside the Link tag (cause duplicate link), 
          but we can rendering it outside of the link and move the styling to a parent div */}
          {ctaIcon && <SvgIcon className={icon()} icon={ctaIcon} size="xs" />}
        </div>
      );

    // If no content is present, don't print
    if (!anchor && !href && !text) return <></>;

    return (
      <NextLink
        {...props}
        className={`${base()} ${className ? className : ''}`}
        data-component="helpers/sitecorewrappers/linkwrapper"
        href={{ pathname: href, query: querystring, hash: anchor }}
        onClick={() => handleOnClick()}
        ref={ref}
        target={target}
        title={title || text}
      >
        {text && <span>{text}</span>}
        {children}
        {ctaIcon && <SvgIcon className={icon()} icon={ctaIcon} size="xs" />}
        {(target === '_blank' || srOnlyText) && (
          <>
            <span className="sr-only">
              {/* Preserve a single space character before SR Tab Text */}
              {`${srOnlyText ? srOnlyText : ''}${target === '_blank' && ' (Opens in a new tab)'}`}
            </span>
            {!suppressNewTabIcon && target === '_blank' && NEW_TAB_ICON}
          </>
        )}
      </NextLink>
    );
  }
);

LinkWrapper.displayName = 'LinkWrapper';

export default LinkWrapper;

const INTERNAL_LINK_REGEX = /^\/|^\#/g;

const NEW_TAB_ICON = (
  <span className="svg-icon inline-flex align-middle -ml-3 h-6 w-6">
    <svg
      aria-hidden="true"
      className="inline ml-2 -mt-1 h-em w-em"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  </span>
);

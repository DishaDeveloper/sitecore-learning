// Global
import { RichText, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { RichTextProps } from '@sitecore-jss/sitecore-jss-nextjs/types/components/RichText';
import React, { useEffect, useState } from 'react';

// Local
import useIsEditing from 'lib/hooks/use-is-editing';

const NEW_TAB_ICON_STRING = `<span class="svg-icon inline-flex align-middle -ml-3 h-6 w-6">
    <svg
      aria-hidden="true"
      class="inline ml-2 -mt-1 h-em w-em"
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
  </span>`;

const RichTextWrapper = ({ field, editable = true, ...props }: RichTextProps): JSX.Element => {
  const isEditing = useIsEditing() && editable;
  const updatedField = useUpdatedRichTextField({ field, editable });

  const hasValue = !!updatedField?.value;

  // We should only render if it has a value, or if we are editing
  const shouldRender = hasValue || isEditing;

  if (!shouldRender) return <></>;

  return (
    <RichText
      {...props}
      className={`rte ${props?.className}`}
      data-component="helpers/fieldwrappers/richtextwrapper"
      editable={editable}
      field={updatedField}
    />
  );
};

function useUpdatedRichTextField({ field, editable = true }: RichTextProps) {
  const isEditing = useIsEditing() && editable;

  const [content, setContent] = useState(field?.value);

  const updatedField: RichTextField = {
    value: content || '',
  };

  // Run this client-side because we don't have access to the document server-side
  useEffect(() => {
    const template = document.createElement('template');
    template.innerHTML = field?.value || '';

    // Find all links either either have target="_blank" or appear to be external due to starting with "http"
    const externalLinks = [...template.content.querySelectorAll('a')].filter(
      (a) =>
        a.attributes.getNamedItem('href')?.value.startsWith('http') ||
        a.attributes.getNamedItem('target')?.value === '_blank'
    );
    // Update each external link
    externalLinks.forEach((a) => {
      // Set to open in new tab
      a.setAttribute('target', '_blank');
      // Add Screen Reader text and new tab icon
      a.innerHTML = `${a.innerHTML}<span class="sr-only"> (Opens in a new tab)</span> ${NEW_TAB_ICON_STRING}`;
    });

    // Update the content
    setContent(template.innerHTML);
  }, [field?.value]);

  return isEditing ? field : updatedField;
}

export default RichTextWrapper;

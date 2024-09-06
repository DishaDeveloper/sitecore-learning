import React from 'react';
import { ComponentProps } from 'lib/component-props';
import { HztlPageContent } from '../../../../.generated/Feature.HztlFoundation.model';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';

export type RTEProps = ComponentProps & HztlPageContent.Rte;

export const Default = (props: RTEProps): JSX.Element => {
  const text = props.fields ? (
    <RichTextWrapper field={props?.fields?.text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );

  const id = props?.params?.RenderingIdentifier;

  return (
    <div
      className={`component rich-text ${props.params?.styles.trimEnd()}`}
      data-component="authorable/rte"
      id={id ? id : undefined}
    >
      <div className="py-spacing-spacing-7 px-spacing-spacing-4 md:px-spacing-spacing-2">
        {text}
      </div>
    </div>
  );
};

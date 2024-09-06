import React from 'react';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { HztlPageContent } from '../../../../.generated/Feature.HztlFoundation.model';
import { ComponentProps } from 'lib/component-props';

export type CustomFormProps = ComponentProps & HztlPageContent.CustomForm;

const CustomFormDefaultComponent = (props: CustomFormProps): JSX.Element => (
  <div className={`component card ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CustomForm</span>
    </div>
  </div>
);

export const Default = (props: CustomFormProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  if (props?.fields) {
    return (
      <div className={`component card ${props?.params?.styles}`} id={id ? id : undefined}>
        <div data-component="authorable/general/card" className="flex justify-center items-center">
          <div className="mx-auto my-0">
            <div className="border border-gray">
              <Text field={props?.fields?.title} tag="h3" />
              <RichTextWrapper
                className="font-modern text-gray text-base font-normal not-italic leading-6 mb-2 opacity-90"
                field={props?.fields?.description}
                tag="div"
              />
              <div className="flex gap-xxs flex-wrap justify-center md:justify-normal">
                <LinkWrapper
                  className="flex items-center justify-center px-4 py-3 rounded bg-gray text-center text-white font-modern text-sm font-bold not-italic leading-normal"
                  field={props?.fields?.primaryCTA}
                  suppressNewTabIcon={true}
                />
                <LinkWrapper
                  className="flex items-center justify-center p-3 rounded border border-gray text-center text-gray font-modern text-base font-bold not-italic leading-normal"
                  field={props?.fields?.secondaryCTA}
                  suppressNewTabIcon={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <CustomFormDefaultComponent {...props} />;
};

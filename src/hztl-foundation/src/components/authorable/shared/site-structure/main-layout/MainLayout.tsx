import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

import { ComponentProps } from 'lib/component-props';

export const Default = (props: ComponentProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  return (
    <div className="m-auto w-full max-w-screen-xl md:p-8" data-component="main-layout" id={id}>
      <div>
        <Placeholder name="hztl-headless-breadcrumb" rendering={props.rendering} />
      </div>
      <div>
        <Placeholder name="hztl-headless-hero" rendering={props.rendering} />
      </div>
      <div>
        <Placeholder name="hztl-headless-main-content" rendering={props.rendering} />
      </div>
    </div>
  );
};

// Global
import React from 'react';

// Lib
import { ComponentProps } from 'lib/component-props';
import { HztlPageContent } from '../../../../.generated/Feature.HztlFoundation.model';

// Local
import VideoWrapper, { VideoWrapperProps } from 'helpers/GenericWrappers/VideoWrapper/VideoWrapper';

export type InlineVideoProps = ComponentProps &
  HztlPageContent.Video & {
    fields?: {
      Video?: {
        value: VideoWrapperProps;
      };
    };
  };

/*
 * RENDERING
 */

const InlineVideo = (props: InlineVideoProps): JSX.Element => {
  const { Video } = props?.fields || {};

  if (!props?.fields)
    return (
      <div className="component video">
        <div className="component-content">
          <span className="is-empty-hint">Video</span>
        </div>
      </div>
    );

  return (
    <VideoWrapper
      autoplay={Video?.value?.autoplay}
      captions={Video?.value?.captions}
      controls={Video?.value?.controls}
      fluid={Video?.value?.fluid}
      height={Video?.value?.height}
      loop={Video?.value?.loop}
      muted={Video?.value?.muted}
      poster={Video?.value?.poster}
      sources={Video?.value?.sources || []}
      subtitles={Video?.value?.subtitles}
      width={Video?.value?.width}
    />
  );
};

export default InlineVideo;

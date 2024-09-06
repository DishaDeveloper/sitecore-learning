// Global
import React from 'react';

// Lib
import { ComponentProps } from 'lib/component-props';
import { HztlPageContent } from '../../../../.generated/Feature.HztlFoundation.model';

// Local
import ModalWrapper, { ModalWrapperProps } from 'helpers/GenericWrappers/ModalWrapper/ModalWrapper';
import VideoWrapper, { VideoWrapperProps } from 'helpers/GenericWrappers/VideoWrapper/VideoWrapper';

export type ModalVideoProps = ComponentProps &
  HztlPageContent.Video & {
    fields?: {
      Video?: {
        value: VideoWrapperProps;
      };
      Modal?: {
        value: ModalWrapperProps;
      };
    };
  };

/*
 * RENDERING
 */

const ModalVideo = (props: ModalVideoProps): JSX.Element => {
  const { Modal, Video } = props?.fields || {};

  if (!props?.fields)
    return (
      <div className="component video">
        <div className="component-content">
          <span className="is-empty-hint">Video</span>
        </div>
      </div>
    );

  return (
    <ModalWrapper
      content={
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
      }
      id={Modal?.value?.id || ''}
      label={Modal?.value?.label || ''}
      size={Modal?.value?.size}
      title={Modal?.value?.title}
      trigger={Modal?.value?.trigger}
    />
  );
};

export default ModalVideo;

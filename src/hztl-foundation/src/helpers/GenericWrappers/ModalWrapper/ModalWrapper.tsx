// Global
import { sendGTMEvent } from '@next/third-parties/google';
import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { tv } from 'tailwind-variants';

// Lib
import { GtmEvent } from 'lib/utils/gtm-utils';

// Local
import { SvgIcon } from 'helpers/SvgIconWrapper';

type ModalSize = 'extra-large' | 'fluid' | 'large' | 'medium' | 'small' | undefined;

export type ModalWrapperProps = {
  content: ReactNode;
  gtmEvent?: GtmEvent;
  id: string;
  label: string;
  openOnLoad?: boolean;
  size?: ModalSize;
  title?: ReactNode;
  trigger?: ReactNode;
};

// React Modal Defaults
Modal.defaultStyles = {
  overlay: {
    backgroundColor: 'rgba(47, 45, 46, 0.75)',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 100,
  },
};
Modal.setAppElement(process.env.IS_STORYBOOK ? '#storybook-root' : '#__next');

// Tailwind Variants
const modalWrapperStyles = tv({
  slots: {
    body: [],
    closeButton: ['h-6', 'w-6'],
    closeButtonIcon: [],
    modal: [
      'absolute',
      'bg-white',
      'border',
      'border-mild-gray',
      'flex',
      'flex-col',
      'gap-5',
      'left-2/4',
      'outline-none',
      'p-5',
      'rounded',
      'top-2/4',
      '-translate-x-2/4',
      '-translate-y-2/4',
    ],
    titleBar: ['flex', 'flex-row'],
    titleBarText: ['grow'],
    triggerContainer: ['inline-block'],
  },
  variants: {
    size: {
      'extra-large': {
        modal: ['h-auto', 'max-h-[540px]', 'w-full', 'md:max-h-[680px]', 'md:w-[75vw]'],
      },
      fluid: {
        modal: ['h-auto', 'w-auto'],
      },
      large: {
        modal: ['h-auto', 'max-h-[540px]', 'w-full', 'md:max-h-[680px]', 'md:w-[50vw]'],
      },
      medium: {
        modal: ['h-auto', 'max-h-[540px]', 'w-full', 'md:max-h-[540px]', 'md:w-[33vw]'],
      },
      small: {
        modal: ['h-auto', 'max-h-[540px]', 'w-full', 'md:max-h-[432px]', 'md:w-[25vw]'],
      },
    },
  },
});

const ModalWrapper = (props: ModalWrapperProps): JSX.Element => {
  const {
    content,
    gtmEvent,
    id,
    label,
    openOnLoad = false,
    size = 'large',
    title,
    trigger,
  } = props || {};

  const { body, closeButton, closeButtonIcon, modal, titleBar, titleBarText, triggerContainer } =
    modalWrapperStyles({
      size: size,
    });

  /*
   * State
   */

  const [isOpen, setIsOpen] = useState(false);

  /*
   * Event Handlers
   */

  const handleOnAfterClose = () => {
    return;
  };

  const handleOnAfterOpen = () => {
    const gtmEventInner = {
      ...gtmEvent,
      'gtm.element.dataset.gtmComponentName': 'helpers-sitecorewrappers-modalwrappertwo',
      'gtm.element.dataset.gtmDatasourceId': id,
    };

    sendGTMEvent(gtmEventInner);
  };

  const handleOnCloseModal = () => {
    setIsOpen(false);

    const gtmEventInner = {
      ...gtmEvent,
      'gtm.element.dataset.gtmComponentName': 'helpers-sitecorewrappers-modalwrappertwo',
      'gtm.element.dataset.gtmDatasourceId': id,
    };

    sendGTMEvent(gtmEventInner);
  };

  const handleOnOpenModal = () => {
    setIsOpen(true);
  };

  const handleOnRequestClose = () => {
    handleOnCloseModal();

    return;
  };

  const handleOnRemoteTriggerEvent = (e: CustomEvent) => {
    const { modalId } = e?.detail || {};

    if (modalId !== `modal-${id}`) return;

    handleOnOpenModal();
  };

  /*
   * Lifecycle
   */

  useEffect(() => {
    document.addEventListener(
      'trigger-modal',
      (e) => handleOnRemoteTriggerEvent(e as CustomEvent),
      false
    );

    return () => {
      document.removeEventListener('trigger-modal', (e) =>
        handleOnRemoteTriggerEvent(e as CustomEvent)
      );
    };
  });

  useEffect(() => {
    (openOnLoad || !trigger) && handleOnOpenModal();
  }, [openOnLoad, trigger]);

  /*
   * Rendering
   */

  return (
    <>
      {trigger && (
        <span
          aria-controls={`modal-${id}`}
          className={triggerContainer()}
          id={`modal-${id}-button`}
          onClick={() => handleOnOpenModal()}
          role="button"
        >
          {trigger}
        </span>
      )}
      <Modal
        ariaHideApp={true}
        className={modal()}
        closeTimeoutMS={300}
        contentLabel={label}
        data-component="helpers-sitecorewrappers-modalwrappertwo"
        id={`modal-${id}`}
        isOpen={isOpen}
        onAfterClose={handleOnAfterClose}
        onAfterOpen={handleOnAfterOpen}
        onRequestClose={handleOnRequestClose}
        role="dialog"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={true}
      >
        <div className={titleBar()}>
          {title && <h2 className={titleBarText()}>{title}</h2>}
          <button
            aria-label="Close Modal Button"
            className={closeButton()}
            onClick={handleOnCloseModal}
            role="button"
          >
            <SvgIcon
              aria-hidden="true"
              aria-label="Close Modal Button Icon"
              className={closeButtonIcon()}
              icon="close"
              size="lg"
            />
          </button>
        </div>
        <div className={body()}>{content}</div>
      </Modal>
    </>
  );
};

export default ModalWrapper;

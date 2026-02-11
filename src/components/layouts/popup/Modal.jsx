import { useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';

// Картинки
import closeIcon from '../../../assets/images/modal-close.svg';
import ModalLoader from './ModalLoader';

function Modal({ isOpen, onClose, showCloseButton = true, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-body">
        <Suspense fallback={<ModalLoader />}>
          {showCloseButton ? (
            <button className="modal-close" onClick={onClose}>
              <img src={closeIcon} className="modal-close-icon" />
            </button>
          ) : null}
          {children}
        </Suspense>
      </div>
    </div>,
    document.body
  );
}

export default Modal;

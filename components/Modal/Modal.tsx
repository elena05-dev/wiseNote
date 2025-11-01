'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="22" height="22" aria-hidden="true">
            <use href="#icon-close" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}

'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import EditNoteForm from '../EditNoteForm/EditNoteForm.client';
import type { Note } from '@/types/note';
import css from './EditNoteModal.module.css';

interface EditNoteModalProps {
  note: Note | null;
  onClose: () => void;
}

export default function EditNoteModal({ note, onClose }: EditNoteModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!note) return null;

  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="22" height="22" aria-hidden="true">
            <use href="#icon-close" />
          </svg>
        </button>
        <EditNoteForm note={note} onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}

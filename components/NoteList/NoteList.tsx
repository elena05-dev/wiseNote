'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';
import Link from 'next/link';
import EditNoteModal from '../EditNoteModal/EditNoteModal.client';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { mutate: removeNote, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Delete this note? This action cannot be undone.')) {
      removeNote(id);
    }
  };

  if (!notes || notes.length === 0) {
    return <p className={css.empty}>No notes available.</p>;
  }

  const editingNote = notes.find((n) => n.id === editingId);

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>
              {note.content.substring(0, 120)}
              {note.content.length > 120 ? '…' : ''}
            </p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                <Link href={`/notes/${note.id}`} className={css.link}>
                  View details
                </Link>
                <button
                  className={css.edit}
                  onClick={() => setEditingId(note.id)}
                  aria-label={`Edit note: ${note.title}`}
                >
                  {isPending ? (
                    'Saving...'
                  ) : (
                    <svg width="32" height="32" aria-hidden="true">
                      <use href="#icon-pencil" />
                    </svg>
                  )}
                </button>
                <button
                  className={css.button}
                  onClick={(e) => handleDelete(note.id, e)}
                  disabled={isPending}
                  aria-label={`Delete note: ${note.title}`}
                >
                  {isPending ? (
                    'Deleting...'
                  ) : (
                    <svg width="24" height="24" aria-hidden="true">
                      <use href="#icon-box" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {editingNote && (
        <EditNoteModal note={editingNote} onClose={() => setEditingId(null)} />
      )}
    </>
  );
}

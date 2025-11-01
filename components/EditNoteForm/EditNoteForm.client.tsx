'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { Note } from '@/types/note';
import { updateNote } from '@/lib/api/clientApi';
import css from './EditNoteForm.module.css';

interface EditNoteFormProps {
  note: Note;
  onClose: () => void;
}

export default function EditNoteForm({ note, onClose }: EditNoteFormProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tag, setTag] = useState<Note['tag']>(note.tag);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (updated: Partial<Note>) => updateNote(note.id, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note successfully saved!');
      onClose();
    },
    onError: (err) => {
      console.error('Error saving note:', err);
      toast.error('Failed to save changes');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { title, content, tag };
    mutate(updated);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className={css.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <select
        className={css.select}
        value={tag}
        onChange={(e) => setTag(e.target.value as Note['tag'])}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <button className={css.button} type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

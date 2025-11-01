import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  note?: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  if (!note) {
    return <p>Loading note...</p>;
  }

  const createdAt = note.createdAt
    ? new Date(note.createdAt).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Unknown';

  const updatedAt = note.updatedAt
    ? new Date(note.updatedAt).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Unknown';

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>{note.title || 'Untitled'}</h2>
      </div>

      <div className={css.content}>{note.content || 'No content'}</div>

      <div className={css.meta}>
        <span className={css.tag}>{note.tag || 'No tag'}</span>
        <p>
          <strong>Created:</strong> {createdAt}
        </p>
        <p>
          <strong>Updated:</strong> {updatedAt}
        </p>
      </div>
    </div>
  );
}

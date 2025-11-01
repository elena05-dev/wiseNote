'use client';

import css from './NoteDetails.module.css';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

export default function NoteDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Error loading note: {(error as Error).message}</p>
        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    );
  }

  if (!note) {
    return <p>Note not found.</p>;
  }

  const createdAt = note.createdAt
    ? new Date(note.createdAt).toLocaleString()
    : '—';
  const updatedAt = note.updatedAt
    ? new Date(note.updatedAt).toLocaleString()
    : '—';

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </div>

        <div className={css.content}>{note.content}</div>

        <div className={css.date}>
          <p>
            <strong>Created:</strong> {createdAt}
          </p>
          <p>
            <strong>Updated:</strong> {updatedAt}
          </p>
          {isFetching && <small>Refreshing data...</small>}
        </div>

        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    </div>
  );
}

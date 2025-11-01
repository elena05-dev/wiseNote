'use client';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { getNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import css from '@/components/NotePreview/NotePreview.module.css';
import NotePreview from '@/components/NotePreview/NotePreview';

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const queryOptions: UseQueryOptions<Note, Error> = {
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  };

  const { data: note, isLoading, isError } = useQuery(queryOptions);

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError || !note)
    return <Modal onClose={handleClose}>Error loading note.</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.modalWrapper}>
        <NotePreview note={note} />
      </div>
    </Modal>
  );
}

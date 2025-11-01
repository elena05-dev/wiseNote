import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WiseNote | Create Note',
  description:
    'Create a new note in WiseNote. Add a title, content, and tag to keep your thoughts organized.',
  openGraph: {
    title: 'WiseNote | Create Note',
    description:
      'Create a new note in WiseNote. Add a title, content, and tag to keep your thoughts organized.',
    url: 'https://wise-note-nu.vercel.app/',
    images: [
      {
        url: 'https://wise-note-nu.vercel.app/wise-note-og.png',
        width: 1200,
        height: 630,
        alt: 'Create Note',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

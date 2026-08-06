import type { Note } from '@/types/note';

type ServerNote = {
  _id: string;
  title: string;
  content: string;
  tag: Note['tag'];
  createdAt: string;
  updatedAt: string;
};

export function normalizeNote(note: ServerNote): Note {
  return {
    id: note._id,
    title: note.title,
    content: note.content,
    tag: note.tag,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
}

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getNoteByIdServer } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';
import type { Note } from '@/types/note';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id: noteId } = await params;

  const note: Note | null = await getNoteByIdServer(noteId);

  return {
    title: `WiseNote : ${note.title}`,
    description: note.content.slice(0, 160),
    openGraph: {
      title: `WiseNote : ${note.title}`,
      description: note.content.slice(0, 160),
      url: `https://wise-note-nu.vercel.app/`,
      images: [
        {
          url: 'https://wise-note-nu.vercel.app/wise-note-og.png',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'website',
    },
  };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id: noteId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => getNoteByIdServer(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

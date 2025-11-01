import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import type { NoteTag } from '@/types/note';

type SyncProps = { params: { slug?: string[] } };
type AsyncProps = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({
  params,
}: SyncProps): Promise<Metadata> {
  const slug = (await Promise.resolve(params)).slug;
  const rawTag = slug?.[0];
  const tag: NoteTag | undefined =
    rawTag === 'All' ? undefined : (rawTag as NoteTag);

  const title = `Notes filtered by: ${tag ?? 'All'} — WiseNote`;
  const description = `Browse your notes filtered by "${tag ?? 'All'}" in WiseNote. Quickly find the ideas and tasks you need.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://09-auth-azure-eight.vercel.app/`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${tag ?? 'All'}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: AsyncProps) {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'All';

  const allowedTags: NoteTag[] = [
    'All',
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
  ];

  const normalizedTag = allowedTags.includes(tag as NoteTag)
    ? (tag as NoteTag)
    : 'All';

  const rawData = await fetchNotes('', 1, normalizedTag);

  return <NotesClient initialData={rawData} initialTag={normalizedTag} />;
}

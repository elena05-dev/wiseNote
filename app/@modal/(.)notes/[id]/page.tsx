import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getNoteByIdServer } from '@/lib/api/serverApi';
import NotePreviewClient from './view/NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteByIdServer(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}

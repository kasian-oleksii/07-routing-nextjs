import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const NotesPage = async () => {
  const initialPage = 1;
  const initialQuery = '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialPage, initialQuery],
    queryFn: () => fetchNotes(initialPage, initialQuery),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={initialPage} initialQuery={initialQuery} />
    </HydrationBoundary>
  );
};

export default NotesPage;

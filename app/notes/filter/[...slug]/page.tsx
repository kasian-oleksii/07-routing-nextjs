import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  console.log('slug', slug);

  const initialPage = 1;
  const initialQuery = '';
  const initialTag = slug[0] === 'all' ? undefined : slug[0];

  const initialData = await fetchNotes(initialPage, initialQuery, initialTag);

  return <NotesClient initialData={initialData} initialTag={initialTag} />;
}

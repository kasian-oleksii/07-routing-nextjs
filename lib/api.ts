import axios from 'axios';
import type { NewNote, Note, FetchNoteList } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page: number,
  query: string,
): Promise<FetchNoteList> => {
  const params: Record<string, string | number> = {
    perPage: 12,
    page,
  };

  if (query.trim() !== '') {
    params.search = query;
  }

  const response = await axios.get<FetchNoteList>('/notes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await axios.post<Note>('/notes', noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

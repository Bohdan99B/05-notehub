import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

const API_ROOT = 'https://notehub-public.goit.study/api';

const axiosInstance = axios.create({
  baseURL: API_ROOT,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> =
    await axiosInstance.get('/notes', { params });
  return response.data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post(
    '/notes',
    note,
  );
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.delete(
    `/notes/${id}`,
  );
  return response.data;
};

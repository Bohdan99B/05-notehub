import axios, { AxiosResponse } from 'axios';
import { Note } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
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
  currentPage: number;
}

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('/', { params });
  return response.data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post('/', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const response: AxiosResponse<{ id: string }> = await axiosInstance.delete(`/${id}`);
  return response.data;
};

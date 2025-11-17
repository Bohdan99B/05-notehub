import axios from "axios";
import type { Note } from "../types/note";

const API_ROOT = "https://notehub-public.goit.study/api";

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

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await axiosInstance.get("/notes", { params });
  return response.data;
};

export const createNote = async (note: Omit<Note, "id" | "createdAt" | "updatedAt">): Promise<Note> => {
  const response = await axiosInstance.post("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};

import { useEffect } from 'react';
import type { FetchNotesResponse } from '../../services/noteService';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import NoteItem from '../NoteItem/NoteItem';
import css from './NoteList.module.css';

interface NoteListProps {
  search: string;
  page: number;
  onTotalPagesChange?: React.Dispatch<React.SetStateAction<number>>;
}

export default function NoteList({ search, page, onTotalPagesChange }: NoteListProps) {
  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page, perPage: 12 }),
  });

  useEffect(() => {
    if (data?.totalPages && onTotalPagesChange) {
      onTotalPagesChange(data.totalPages);
    }
  }, [data?.totalPages, onTotalPagesChange]);

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes</p>;
  if (!data?.notes?.length) return <p>No notes found</p>;

  return (
    <ul className={css.list}>
      {data.notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
}

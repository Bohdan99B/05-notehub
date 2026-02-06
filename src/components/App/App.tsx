import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import type { CreateNoteParams } from '../../services/noteService';
import { createNote, fetchNotes } from '../../services/noteService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import styles from './App.module.css';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page, perPage: 12 }),
    placeholderData: prev => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    debouncedSetSearch(value);
  };

  const handleCreateNote = async (noteData: CreateNoteParams) => {
    await createNote(noteData);
    await queryClient.invalidateQueries({ queryKey: ['notes'] });
    setIsModalOpen(false);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const errorMessage =
    error instanceof Error ? error.message : 'Something went wrong';

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearch} />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <ErrorMessage message={errorMessage} />}
      {!isLoading && !isError && notes.length === 0 && (
        <p>No notes found</p>
      )}

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onSubmit={handleCreateNote} onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

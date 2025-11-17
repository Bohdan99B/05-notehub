import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./App.module.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage: 12 }),
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCreateNote = async (noteData: {
    title: string;
    content: string;
    tag: string;
  }) => {
    await createNote(noteData);

    await queryClient.invalidateQueries({ queryKey: ["notes"] });

    setIsModalOpen(false);
  };

  return (
    <div className={styles.app}>

      {}
      <div className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />

        <button
          className={styles.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />

      {}
      {isLoading && <p>Loading…</p>}
      {!isLoading && notes.length === 0 && <p>No notes found</p>}

      <NoteList notes={notes} />

      {}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={handleCreateNote} />
        </Modal>
      )}
    </div>
  );
}

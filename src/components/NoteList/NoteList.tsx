import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] })
  });

  return (
    <ul className={styles.list}>
      {notes.map(note => (
        <li key={note.id} className={styles.listItem}>
          
          <h3 className={styles.title}>{note.title}</h3>

          <p className={styles.content}>{note.content}</p>

          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>

            <button
              className={styles.button}
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>

        </li>
      ))}
    </ul>
  );
}

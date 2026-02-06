import type { Note } from '../../types/note';
import NoteItem from '../NoteItem/NoteItem';
import styles from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) return null;

  return (
    <ul className={styles.list}>
      {notes.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
}

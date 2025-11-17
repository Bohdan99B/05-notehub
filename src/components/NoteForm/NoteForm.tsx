import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (data: { title: string; content: string; tag: string }) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Todo");
  const [errors, setErrors] = useState<{ title?: string; content?: string; tag?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({ title, content, tag });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>

      <div className={styles.formGroup}>
        <label>Title</label>
        <input className={styles.input} value={title} onChange={e => setTitle(e.target.value)} />
        {errors.title && <ErrorMessage message={errors.title} />}
      </div>

      <div className={styles.formGroup}>
        <label>Content</label>
        <textarea className={styles.textarea} value={content} onChange={e => setContent(e.target.value)} />
        {errors.content && <ErrorMessage message={errors.content} />}
      </div>

      <div className={styles.formGroup}>
        <label>Tag</label>
        <select className={styles.select} value={tag} onChange={e => setTag(e.target.value)}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={() => history.back()}>
          Cancel
        </button>

        <button type="submit" className={styles.submitButton}>
          Create note
        </button>
      </div>

    </form>
  );
}

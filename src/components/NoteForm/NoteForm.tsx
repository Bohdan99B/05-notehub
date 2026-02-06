import type { MouseEvent } from 'react';
import { ErrorMessage as FormikErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import type { NoteTag } from '../../types/note';
import styles from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (data: NoteFormValues) => Promise<void> | void;
  onCancel: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.mixed<NoteTag>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Formik<NoteFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        await onSubmit(values);
        actions.resetForm();
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className={styles.input}
              value={values.title}
              onChange={handleChange}
            />
            <FormikErrorMessage name="title">
              {message => <span className={styles.error}>{message}</span>}
            </FormikErrorMessage>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              className={styles.textarea}
              value={values.content}
              onChange={handleChange}
            />
            <FormikErrorMessage name="content">
              {message => <span className={styles.error}>{message}</span>}
            </FormikErrorMessage>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select
              id="tag"
              name="tag"
              className={styles.select}
              value={values.tag}
              onChange={handleChange}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
            <FormikErrorMessage name="tag">
              {message => <span className={styles.error}>{message}</span>}
            </FormikErrorMessage>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Create note
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

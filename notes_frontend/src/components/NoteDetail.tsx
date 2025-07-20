/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Note } from "../types";
import styles from "./NoteDetail.module.css";

interface NoteDetailProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

// PUBLIC_INTERFACE
const NoteDetail: React.FC<NoteDetailProps> = ({
  note,
  onEdit,
  onDelete,
  loading,
}) => (
  <div className={styles.detail}>
    <div className={styles.header}>
      <h2>{note.title || <i>Untitled</i>}</h2>
      <div className={styles.actions}>
        <button
          className={styles.editBtn}
          onClick={() => onEdit(note)}
          aria-label="Edit note"
          disabled={loading}
        >
          Edit
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => {
            if (typeof window !== "undefined" && window.confirm) {
              if (window.confirm("Are you sure?")) onDelete(note.id);
            }
          }}
          aria-label="Delete note"
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
    <div className={styles.meta}>
      Updated: {note.updated_at.slice(0, 16).replace("T", " ")}
    </div>
    <article className={styles.content}>
      {note.content && <pre>{note.content}</pre>}
      {!note.content && (
        <div className={styles.noContent}>No content.</div>
      )}
    </article>
  </div>
);

export default NoteDetail;

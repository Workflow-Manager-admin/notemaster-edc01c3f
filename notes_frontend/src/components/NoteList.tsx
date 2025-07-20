/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { Note } from "../types";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  selectedId?: number;
  onSelect: (id: number) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

// PUBLIC_INTERFACE
const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  loading,
}) => {
  if (loading)
    return <div className={styles.loading}>Loading...</div>;
  if (!notes.length)
    return (
      <div className={styles.empty}>
        <span>No notes.</span>
      </div>
    );

  return (
    <ul className={styles.list}>
      {notes.map((n) => (
        <li
          key={n.id}
          className={
            n.id === selectedId
              ? `${styles.item} ${styles.selected}`
              : styles.item
          }
          title={n.title}
        >
          <div
            className={styles.clickArea}
            onClick={() => onSelect(n.id)}
            tabIndex={0}
            aria-label={`Select ${n.title}`}
          >
            <div className={styles.title}>{n.title || <i>Untitled</i>}</div>
            <div className={styles.meta}>{n.updated_at.slice(0, 10)}</div>
          </div>
          <div className={styles.actions}>
            <button
              onClick={() => onEdit(n)}
              className={styles.edit}
              aria-label="Edit"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.confirm) {
                  if (window.confirm("Delete note?")) onDelete(n.id);
                }
              }}
              className={styles.delete}
              aria-label="Delete"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;

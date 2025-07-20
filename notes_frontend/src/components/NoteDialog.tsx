/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Note } from "../types";
import styles from "./NoteDialog.module.css";

interface NoteDialogProps {
  open: boolean;
  note?: Note;
  isEdit: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string; id?: number }) => void;
}

// PUBLIC_INTERFACE
const NoteDialog: React.FC<NoteDialogProps> = ({
  open,
  note,
  isEdit,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note, open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }
  }, [onClose]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (e.target && ref.current && ref.current === e.target) onClose();
    }
    if (open && ref.current) {
      ref.current.focus();
      ref.current.addEventListener("mousedown", handleOutside);
      return () =>
        ref.current?.removeEventListener("mousedown", handleOutside);
    }
  }, [open, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      if (typeof window !== "undefined" && window.alert) {
        window.alert("Title required.");
      }
      return;
    }
    onSubmit({ title: title.trim(), content, id: note?.id });
  }

  if (!open) return null;
  return (
    <div tabIndex={-1} className={styles.overlay} ref={ref}>
      <form className={styles.dialog} onSubmit={handleSubmit}>
        <h3>{isEdit ? "Edit Note" : "Add Note"}</h3>
        <label>
          <div className={styles.label}>Title:</div>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
            placeholder="Title"
            maxLength={120}
          />
        </label>
        <label>
          <div className={styles.label}>Content:</div>
          <textarea
            className={styles.textarea}
            value={content}
            rows={7}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            maxLength={4000}
          />
        </label>
        <div className={styles.buttons}>
          <button className={styles.saveBtn} type="submit">
            {isEdit ? "Save changes" : "Add"}
          </button>
          <button
            className={styles.cancelBtn}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteDialog;

/* eslint-disable no-unused-vars */
import React from "react";
import { Note } from "../types";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  notes: Note[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onAdd: () => void;
}

// PUBLIC_INTERFACE
const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  notes,
  selectedId,
  onSelect,
  onAdd,
}) => {
  return (
    <nav className={`${styles.sidebar}${open ? " " + styles.mobileOpen : ""}`}>
      <div className={styles.sideHeader}>
        <span className={styles.sideTitle}>Notes</span>
        <button className={styles.addBtn} title="Add note" onClick={onAdd}>
          +
        </button>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>
      <ul className={styles.noteListNav}>
        {notes.length === 0 ? (
          <li className={styles.empty}>No notes</li>
        ) : (
          notes.map((n) => (
            <li
              key={n.id}
              className={
                n.id === selectedId
                  ? `${styles.navItem} ${styles.selected}`
                  : styles.navItem
              }
              onClick={() => onSelect(n.id)}
              title={n.title}
              tabIndex={0}
            >
              <span className={styles.dot} />
              <span className={styles.navTitle}>
                {n.title || <i>Untitled</i>}
              </span>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;

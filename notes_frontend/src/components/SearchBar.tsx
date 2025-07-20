/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// PUBLIC_INTERFACE
const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className={styles.searchBar}>
    <input
      className={styles.input}
      type="search"
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search notes"
      autoComplete="off"
    />
    {value && (
      <button
        className={styles.clearBtn}
        aria-label="Clear search"
        onClick={() => onChange("")}
        type="button"
      >
        ×
      </button>
    )}
  </div>
);

export default SearchBar;

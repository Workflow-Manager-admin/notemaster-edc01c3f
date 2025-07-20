import React from "react";
import styles from "./Topbar.module.css";

// Removed unused theme prop
interface TopbarProps {
  onMenu?: () => void;
}

// PUBLIC_INTERFACE
const Topbar: React.FC<TopbarProps> = ({ onMenu }) => (
  <header className={styles.topbar}>
    <div className={styles.nav}>
      {onMenu && (
        <button className={styles.menuBtn} onClick={onMenu} aria-label="Menu">
          <span className={styles.menuIcon} />
        </button>
      )}
      <span className={styles.logo}>notemaster</span>
    </div>
  </header>
);

export default Topbar;

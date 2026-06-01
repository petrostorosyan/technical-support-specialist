import type { RefObject } from "react";
import styles from "../Header.module.css";

type SearchModalProps = {
  isOpen: boolean;
  searchQuery: string;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onSearchChange: (value: string) => void;
  onClose: () => void;
};

const SearchModal = ({
  isOpen,
  searchQuery,
  searchInputRef,
  onSearchChange,
  onClose,
}: SearchModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`${styles.searchModalOverlay} ${styles.searchModalOverlayVisible}`}
      onClick={onClose}
    >
      <div className={styles.searchModal} onClick={(event) => event.stopPropagation()}>
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search by title..."
          className={styles.searchModalInput}
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search posts"
        />
        <button type="button" className={styles.searchModalClose} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchModal;

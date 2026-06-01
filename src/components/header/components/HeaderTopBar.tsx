import type { RefObject } from "react";
import styles from "../Header.module.css";
import logo from "../../../assets/logo.svg";
import SearchIcon from "../../icons/SearchIcon";

type HeaderTopBarProps = {
  topBarRef: RefObject<HTMLDivElement | null>;
  onOpenMobileMenu: () => void;
  onOpenSearchModal: () => void;
};

const HeaderTopBar = ({
  topBarRef,
  onOpenMobileMenu,
  onOpenSearchModal,
}: HeaderTopBarProps) => {
  return (
    <header className={styles.header}>
      <div ref={topBarRef} className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <button
            type="button"
            className={styles.hamburgerButton}
            aria-label="Open mobile menu"
            onClick={onOpenMobileMenu}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>

          <img src={logo} alt="Logo" className={styles.logo} />

          <div className={styles.searchBox}>
            <button
              type="button"
              className={styles.searchButton}
              aria-label="Search"
              onClick={onOpenSearchModal}
            >
              <SearchIcon width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTopBar;

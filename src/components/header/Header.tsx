import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import SearchIcon from "../icons/SearchIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const HIDE_AFTER_STICKY_OFFSET = 200;

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const searchModalInputRef = useRef<HTMLInputElement | null>(null);
  const lastScrollYRef = useRef(0);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const topBarElement = topBarRef.current;
    if (!topBarElement) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      setTopBarHeight(entry.contentRect.height);
    });

    resizeObserver.observe(topBarElement);
    setTopBarHeight(topBarElement.getBoundingClientRect().height);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsMenuHidden(false);
        lastScrollYRef.current = 0;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      const hideStartOffset = topBarHeight + HIDE_AFTER_STICKY_OFFSET;

      if (isScrollingDown && currentScrollY > hideStartOffset) {
        setIsMenuHidden(true);
      }

      if (!isScrollingDown) {
        setIsMenuHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topBarHeight]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 64.0625rem)");

    const handleDesktopMode = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleDesktopMode);

    if (mediaQuery.matches) {
      setIsMobileMenuOpen(false);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleDesktopMode);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchModalOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [isMobileMenuOpen, isSearchModalOpen]);

  useEffect(() => {
    if (!isSearchModalOpen) {
      return;
    }

    const focusId = window.requestAnimationFrame(() => {
      const input = searchModalInputRef.current;
      if (!input) {
        return;
      }
      input.focus();
      const valueLength = input.value.length;
      input.setSelectionRange(valueLength, valueLength);
    });

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      window.cancelAnimationFrame(focusId);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchModalOpen]);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <>
      <header className={styles.header}>
        <div ref={topBarRef} className={styles.topBar}>
          <div className={styles.topBarContainer}>
            <button
              type="button"
              className={styles.hamburgerButton}
              aria-label="Open mobile menu"
              onClick={() => setIsMobileMenuOpen(true)}
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
                onClick={openSearchModal}
              >
                <SearchIcon width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav
        className={`${styles.menu} ${isMenuHidden ? styles.menuHidden : ""}`}
        aria-label="Main navigation"
      >
        <div className={styles.container}>
          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Demos{" "}
              <span className={styles.caret}>
                <ChevronDownIcon className={styles.menuChevron} />
              </span>
            </a>
          </div>

          <div className={`${styles.menuItem} ${styles.menuItemWithDropdown}`}>
            <a href="/" className={styles.menuLink}>
              Post{" "}
              <span className={styles.caret}>
                <ChevronDownIcon className={styles.menuChevron} />
              </span>
            </a>

            <div className={styles.dropdown}>
              <ul className={styles.dropdownList}>
                <li className={styles.li}>
                  <a href="/" className={styles.dropdownLink}>
                    <span>Post Header</span>
                    <span className={styles.dropdownArrow}>
                      <ChevronDownIcon />
                    </span>
                  </a>
                </li>
                <li className={styles.li}>
                  <a href="/" className={styles.dropdownLink}>
                    <span>Post Layout</span>
                    <span className={styles.dropdownArrow}>
                      <ChevronDownIcon />
                    </span>
                  </a>
                </li>
                <li className={styles.li}>
                  <a href="/" className={styles.dropdownLink}>
                    <span>Share Buttons</span>
                    <span className={styles.dropdownArrow}>
                      <ChevronDownIcon />
                    </span>
                  </a>
                </li>
                <li className={styles.li}>
                  <a href="/" className={styles.dropdownLink}>
                    <span>Gallery Post</span>
                    <span className={styles.dropdownArrow}>
                      <ChevronDownIcon />
                    </span>
                  </a>
                </li>
                <li className={styles.li}>
                  <a href="/" className={styles.dropdownLink}>
                    <span>Video Post</span>
                    <span className={styles.dropdownArrow}>
                      <ChevronDownIcon />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Features{" "}
              <span className={styles.caret}>
                <ChevronDownIcon className={styles.menuChevron} />
              </span>
            </a>
          </div>

          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Categories{" "}
              <span className={styles.caret}>
                <ChevronDownIcon className={styles.menuChevron} />
              </span>
            </a>
          </div>

          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Shop{" "}
              <span className={styles.caret}>
                <ChevronDownIcon className={styles.menuChevron} />
              </span>
            </a>
          </div>

          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Buy Now
            </a>
          </div>
        </div>
      </nav>

      {isSearchModalOpen && (
        <div
          className={`${styles.searchModalOverlay} ${styles.searchModalOverlayVisible}`}
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className={styles.searchModal}
            onClick={(event) => event.stopPropagation()}
          >
            <input
              ref={searchModalInputRef}
              type="search"
              placeholder="Search by title..."
              className={styles.searchModalInput}
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              aria-label="Search posts"
            />
            <button
              type="button"
              className={styles.searchModalClose}
              onClick={() => setIsSearchModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div
        className={`${styles.mobileOverlay} ${
          isMobileMenuOpen ? styles.mobileOverlayVisible : ""
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <aside
          className={`${styles.mobileMenu} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.mobileMenuHeader}>
            <img src={logo} alt="Logo" className={styles.mobileMenuLogo} />

            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close mobile menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className={styles.closeLine} />
              <span className={styles.closeLine} />
            </button>
          </div>

          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <a href="/" className={styles.mobileNavLink}>
              <span>Demos</span>
              <ChevronDownIcon className={styles.mobileNavChevron} />
            </a>
            <a href="/" className={styles.mobileNavLink}>
              <span>Post</span>
              <ChevronDownIcon className={styles.mobileNavChevron} />
            </a>
            <a href="/" className={styles.mobileNavLink}>
              <span>Features</span>
              <ChevronDownIcon className={styles.mobileNavChevron} />
            </a>
            <a href="/" className={styles.mobileNavLink}>
              <span>Categories</span>
              <ChevronDownIcon className={styles.mobileNavChevron} />
            </a>
            <a href="/" className={styles.mobileNavLink}>
              <span>Shop</span>
              <ChevronDownIcon className={styles.mobileNavChevron} />
            </a>
            <a href="/" className={styles.mobileNavLink}>
              <span>Buy Now</span>
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Header;

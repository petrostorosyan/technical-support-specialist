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
  const lastScrollYRef = useRef(0);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <input
                type="search"
                placeholder="Search by title or description..."
                className={styles.searchInput}
                aria-label="Search input"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
              />
              <button
                type="button"
                className={styles.searchButton}
                aria-label="Search"
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
              Demos
            </a>
            <a href="/" className={styles.mobileNavLink}>
              Post
            </a>
            <a href="/" className={styles.mobileNavLink}>
              Features
            </a>
            <a href="/" className={styles.mobileNavLink}>
              Categories
            </a>
            <a href="/" className={styles.mobileNavLink}>
              Shop
            </a>
            <a href="/" className={styles.mobileNavLink}>
              Buy Now
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Header;

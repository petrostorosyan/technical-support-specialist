import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../../assets/logo.svg";
import SearchIcon from "../SearchIcon";

const HIDE_AFTER_STICKY_OFFSET = 200;

const Header = () => {
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const previousScrollYRef = useRef(0);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [isMenuHidden, setIsMenuHidden] = useState(false);

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
        previousScrollYRef.current = 0;
        return;
      }

      const isScrollingDown = currentScrollY > previousScrollYRef.current;
      const hideThreshold = topBarHeight + HIDE_AFTER_STICKY_OFFSET;

      if (isScrollingDown && currentScrollY > hideThreshold) {
        setIsMenuHidden(true);
      }

      if (!isScrollingDown) {
        setIsMenuHidden(false);
      }

      previousScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topBarHeight]);

  return (
    <header className={styles.header}>
      <div ref={topBarRef} className={styles.topBar}>
        <div className={styles.container}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.searchBox}>
          <input
            type="search"
            placeholder="Search..."
            className={styles.searchInput}
            aria-label="Search input"
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

      <nav
        className={`${styles.menu} ${isMenuHidden ? styles.menuHidden : ""}`}
        aria-label="Main navigation"
      >
        <div className={styles.container}>
          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Demos <span className={styles.caret}>v</span>
            </a>
          </div>

          <div className={`${styles.menuItem} ${styles.menuItemWithDropdown}`}>
            <a href="/" className={styles.menuLink}>
              Post <span className={styles.caret}>v</span>
            </a>

            <div className={styles.dropdown}>
              <ul className={styles.dropdownList}>
                <li>
                  <a href="/" className={styles.dropdownLink}>
                    Post Header{" "}
                    <span className={styles.dropdownArrow}>{">"}</span>
                  </a>
                </li>
                <li>
                  <a href="/" className={styles.dropdownLink}>
                    Post Layout{" "}
                    <span className={styles.dropdownArrow}>{">"}</span>
                  </a>
                </li>
                <li>
                  <a href="/" className={styles.dropdownLink}>
                    Share Buttons{" "}
                    <span className={styles.dropdownArrow}>{">"}</span>
                  </a>
                </li>
                <li>
                  <a href="/" className={styles.dropdownLink}>
                    Gallery Post
                  </a>
                </li>
                <li>
                  <a href="/" className={styles.dropdownLink}>
                    Video Post
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Features <span className={styles.caret}>v</span>
            </a>
          </div>

          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Categories <span className={styles.caret}>v</span>
            </a>
          </div>

          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Shop <span className={styles.caret}>v</span>
            </a>
          </div>

          <div className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Buy Now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

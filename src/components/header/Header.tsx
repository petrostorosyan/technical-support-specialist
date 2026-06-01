import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import SearchIcon from "../icons/SearchIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
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

      <nav className={styles.menu} aria-label="Main navigation">
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
    </header>
  );
};

export default Header;

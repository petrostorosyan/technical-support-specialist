import styles from "../Header.module.css";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import { DESKTOP_NAV_ITEMS } from "../constants";

type DesktopMenuProps = {
  isMenuHidden: boolean;
};

const DesktopMenu = ({ isMenuHidden }: DesktopMenuProps) => {
  return (
    <nav
      className={`${styles.menu} ${isMenuHidden ? styles.menuHidden : ""}`}
      aria-label="Main navigation"
    >
      <div className={styles.container}>
        {DESKTOP_NAV_ITEMS.map((item) => {
          const hasDropdown = Boolean(item.dropdownItems?.length);

          return (
            <div
              key={item.label}
              className={`${styles.menuItem} ${
                hasDropdown ? styles.menuItemWithDropdown : ""
              }`}
            >
              <a href="/" className={styles.menuLink}>
                {item.label}{" "}
                {item.withChevron && (
                  <span className={styles.caret}>
                    <ChevronDownIcon className={styles.menuChevron} />
                  </span>
                )}
              </a>

              {hasDropdown && (
                <div className={styles.dropdown}>
                  <ul className={styles.dropdownList}>
                    {item.dropdownItems?.map((dropdownItem) => (
                      <li key={dropdownItem.label} className={styles.li}>
                        <a href="/" className={styles.dropdownLink}>
                          <span>{dropdownItem.label}</span>
                          <span className={styles.dropdownArrow}>
                            <ChevronDownIcon />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default DesktopMenu;

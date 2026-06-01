import styles from "../Header.module.css";
import logo from "../../../assets/logo.svg";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import { MOBILE_NAV_ITEMS } from "../constants";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div
      className={`${styles.mobileOverlay} ${
        isOpen ? styles.mobileOverlayVisible : ""
      }`}
      onClick={onClose}
    >
      <aside
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.mobileMenuHeader}>
          <img src={logo} alt="Logo" className={styles.mobileMenuLogo} />

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close mobile menu"
            onClick={onClose}
          >
            <span className={styles.closeLine} />
            <span className={styles.closeLine} />
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {MOBILE_NAV_ITEMS.map((item) => (
            <a key={item.label} href="/" className={styles.mobileNavLink}>
              <span>{item.label}</span>
              {item.withChevron && (
                <ChevronDownIcon className={styles.mobileNavChevron} />
              )}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;

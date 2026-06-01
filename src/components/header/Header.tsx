import { useEffect, useRef, useState } from "react";
import HeaderTopBar from "./components/HeaderTopBar";
import DesktopMenu from "./components/DesktopMenu";
import SearchModal from "./components/SearchModal";
import MobileMenu from "./components/MobileMenu";

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

  return (
    <>
      <HeaderTopBar
        topBarRef={topBarRef}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
      />

      <DesktopMenu isMenuHidden={isMenuHidden} />

      <SearchModal
        isOpen={isSearchModalOpen}
        searchQuery={searchQuery}
        searchInputRef={searchModalInputRef}
        onSearchChange={onSearchChange}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;

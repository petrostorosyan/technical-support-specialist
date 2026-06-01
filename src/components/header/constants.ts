export type DropdownItem = {
  label: string;
};

export type DesktopNavItem = {
  label: string;
  withChevron?: boolean;
  dropdownItems?: DropdownItem[];
};

export type MobileNavItem = {
  label: string;
  withChevron?: boolean;
};

export const POST_DROPDOWN_ITEMS: DropdownItem[] = [
  { label: "Post Header" },
  { label: "Post Layout" },
  { label: "Share Buttons" },
  { label: "Gallery Post" },
  { label: "Video Post" },
];

export const DESKTOP_NAV_ITEMS: DesktopNavItem[] = [
  { label: "Demos", withChevron: true },
  { label: "Post", withChevron: true, dropdownItems: POST_DROPDOWN_ITEMS },
  { label: "Features", withChevron: true },
  { label: "Categories", withChevron: true },
  { label: "Shop", withChevron: true },
  { label: "Buy Now" },
];

export const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  { label: "Demos", withChevron: true },
  { label: "Post", withChevron: true },
  { label: "Features", withChevron: true },
  { label: "Categories", withChevron: true },
  { label: "Shop", withChevron: true },
  { label: "Buy Now" },
];

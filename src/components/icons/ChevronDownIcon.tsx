import type { FC, SVGProps } from "react";

const ChevronDownIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={5}
      height={8}
      viewBox="0 0 5 8"
      fill="none"
      {...props}
    >
      <path
        d="M0.70697 7.10696L4.0403 3.90696L0.70697 0.70696"
        stroke="black"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default ChevronDownIcon;

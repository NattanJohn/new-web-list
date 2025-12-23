import { IconProps } from "./types";

export const ArrowLeftIcon = ({ size = 20, className }: IconProps) => (
  <svg 
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);
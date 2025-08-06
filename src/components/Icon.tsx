import React from "react";

interface IconProps {
  name: "list" | "calendar-week" | "shopping-bag" | "filter";
  className?: string;
  size?: number;
}

const iconPaths = {
  list: (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 6l11 0" />
      <path d="M9 12l11 0" />
      <path d="M9 18l11 0" />
      <path d="M5 6l0 .01" />
      <path d="M5 12l0 .01" />
      <path d="M5 18l0 .01" />
    </>
  ),
  "calendar-week": (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h16" />
      <path d="M7 14h.013" />
      <path d="M10.01 14h.005" />
      <path d="M13.01 14h.005" />
      <path d="M16.015 14h.005" />
      <path d="M13.015 17h.005" />
      <path d="M7.01 17h.005" />
      <path d="M10.01 17h.005" />
    </>
  ),
  "shopping-bag": (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
      <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
    </>
  ),
  filter: (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 6h16" />
      <path d="M6 12h12" />
      <path d="M9 18h6" />
    </>
  ),
};

export const Icon: React.FC<IconProps> = ({ name, className = "", size = 24 }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
};

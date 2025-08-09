import React from "react";

interface IconProps {
  name: "list" | "calendar-week" | "shopping-bag" | "filter" | "carrot" | "list-numbers" | "search" | "tools-kitchen";
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
  carrot: (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 21s9.834 -3.489 12.684 -6.34a4.487 4.487 0 0 0 0 -6.344a4.483 4.483 0 0 0 -6.342 0c-2.86 2.861 -6.347 12.689 -6.342 12.684z" />
      <path d="M9 13l-1.5 -1.5" />
      <path d="M16 14l-2 -2" />
      <path d="M22 8s-1.14 -2 -3 -2c-1.406 0 -3 2 -3 2s1.14 2 3 2s3 -2 3 -2z" />
      <path d="M16 2s-2 1.14 -2 3s2 3 2 3s2 -1.577 2 -3c0 -1.86 -2 -3 -2 -3z" />
    </>
  ),
  "list-numbers": (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M11 6h9" />
      <path d="M11 12h9" />
      <path d="M11 18h9" />
      <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
      <path d="M6 10v-6l-2 2" />
    </>
  ),
  search: (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </>
  ),
  "tools-kitchen": (
    <>
      <path d="M7 4v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
      <path d="M17 8m-3 0a3 4 0 1 0 6 0a3 4 0 1 0 -6 0" />
      <path d="M17 12v9" />
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

// src/components/Logo.tsx
import React from 'react';

type LogoProps = React.SVGProps<SVGSVGElement>;

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Bima Akbar Logo"
      {...props}
    >
      <path d="M5 5H19V19H16L16 8H5V5Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 19C12.7614 19 15 16.7614 15 14C15 11.2386 12.7614 9 10 9C7.23858 9 5 11.2386 5 14C5 16.7614 7.23858 19 10 19ZM10 16C11.1046 16 12 15.1046 12 14C12 12.8954 11.1046 12 10 12C8.89543 12 8 12.8954 8 14C8 15.1046 8.89543 16 10 16Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo;

// Logo.tsx
import logo from '../assets/bimaakbar-logo.png';
import { SITE } from "../consts";

const Logo = () => {
  return (
    <img
      src={logo.src}
      alt={SITE.TITLE}
      width={24}
      height={24}
      loading="eager"
      className="w-8 h-8"
    />
  );
};

export default Logo;

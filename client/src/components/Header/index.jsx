import { useState } from "react";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import DeskTopMenu from "./DesktopMenu";
import MobileMenuIcon from "./MobileMenuIcon";
import MobileMenu from "./MobileMenu";

// megaMenu
import MegaMenu from "./MegaMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed z-50 w-full border-b border-slate-300 bg-white">
      <div className="relative z-50 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-14 w-full items-center justify-between  sm:h-16">
          <div className="flex flex-1 items-center justify-between gap-10">
            <Logo />
            <SearchBar />
            <DeskTopMenu />
            <MobileMenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
      <div>{isOpen && <MobileMenu setIsOpen={setIsOpen} />}</div>
      <MegaMenu />
    </header>
  );
};

export default Header;

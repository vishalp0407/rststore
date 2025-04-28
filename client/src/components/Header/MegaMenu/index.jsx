import { useState, useRef, useEffect } from "react";

import MegaMenuItem from "./MegaMenuItem";
import AllCategoriesMenuDisplay from "./AllCategoriesMenuDisplay";
import MenMenuDisplay from "./MenMenuDisplay";

const menuComponents = {
  "All Categories": AllCategoriesMenuDisplay,
  Men: MenMenuDisplay,
};

const MegaMenu = () => {
  const [currentMenu, setCurrentMenu] = useState(null);
  const MegaMenuRef = useRef(null);
  const navRef = useRef(null);
  const CurrentMenuComponent = currentMenu ? menuComponents[currentMenu] : null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        MegaMenuRef.current &&
        !MegaMenuRef.current.contains &&
        navRef.current &&
        !navRef.current.contains(e.target)
      ) {
        setCurrentMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <nav
        ref={navRef}
        className="relative z-30 mx-auto hidden max-w-7xl gap-10 bg-white px-3 py-2.5 sm:px-6 lg:flex lg:px-8"
      >
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="All Categories"
        />
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="Men"
        />
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="Women"
        />
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="Kids"
        />
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="Collections"
        />
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="Watches"
        />
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="Shoes"
        />
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="Accessories"
        />
        <MegaMenuItem
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          label="Sale"
        />
      </nav>
      <div ref={MegaMenuRef}>
        {CurrentMenuComponent && <CurrentMenuComponent />}
      </div>
    </>
  );
};
export default MegaMenu;

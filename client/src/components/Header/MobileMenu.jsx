import {
  ShoppingCartIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import MobileSearchBar from "./MobileSearchBar";
import MenuItemMobile from "./MenuItemMobile";

const MobileMenu = ({ setIsOpen }) => {
  return (
    <nav className="relative z-10 w-full overflow-y-auto bg-white pb-2 sm:max-w-sm   ">
      <MobileSearchBar />
      <div className="h-2" />
      <div>
        <MenuItemMobile
          setIsOpen={setIsOpen}
          url="/categories"
          label="Categories"
          icon={TagIcon}
        />
        <MenuItemMobile
          setIsOpen={setIsOpen}
          url="/cart"
          label="Cart"
          icon={ShoppingCartIcon}
        />
        <MenuItemMobile
          setIsOpen={setIsOpen}
          url="/login"
          label="Login"
          icon={UserIcon}
        />
      </div>
    </nav>
  );
};

export default MobileMenu;

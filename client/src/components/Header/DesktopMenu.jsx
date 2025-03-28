import {
  ShoppingCartIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import MenuItem from "./MenuItem";
const DeskTopMenu = () => {
  return (
    <nav className="hidden items-center sm:ml-6  sm:flex sm:space-x-8">
      <MenuItem url="/categories" icon={TagIcon} label="Categories" />
      <MenuItem url="/cart" icon={ShoppingCartIcon} label="Cart" />
      <MenuItem url="/login" icon={UserIcon} label="Login" />
    </nav>
  );
};

export default DeskTopMenu;

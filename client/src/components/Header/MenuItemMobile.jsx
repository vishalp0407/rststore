import { Link } from "react-router-dom";
const MenuItemMobile = ({ url, label, icon: Icon, setIsOpen }) => {
  return (
    <Link
      to={url}
      onClick={() => setIsOpen(false)}
      className="block w-full px-4 py-2 text-sm font-medium text-slate-900 transition-all hover:bg-slate-200 hover:text-indigo-700"
    >
      <div className="flex items-center gap-1.5">
        <Icon className="h-4 w-4" strokeWidth={2} />
        {label}
      </div>
    </Link>
  );
};

export default MenuItemMobile;

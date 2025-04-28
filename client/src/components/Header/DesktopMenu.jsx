import {
  ShoppingBagIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import MenuItem from "./MenuItem";

const DeskTopMenu = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <nav className="hidden items-center sm:ml-6  sm:flex sm:space-x-8">
      <MenuItem url="/categories" icon={TagIcon} label="Categories" />

      <div className="flex items-center gap-2">
        <MenuItem url="/cart" icon={ShoppingBagIcon} label="Cart" />
        {cartItems.length > 0 && (
          <span className="min-w-5 rounded-full bg-indigo-700 text-center text-sm font-semibold text-white">
            {cartItems.length}
          </span>
        )}
      </div>
      {userInfo ? (
        <div className="relative z-50" ref={menuRef}>
          <button
            className="focus:outline-offset-3 rounded-full bg-slate-200 p-2 focus:outline focus:outline-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <UserIcon className="h-5 w-5" />
          </button>

          {isOpen && (
            <nav className="absolute right-0 top-10 min-w-48 rounded-lg bg-white shadow-md">
              <div className="border-b border-slate-300 p-4 pb-3">
                <p className="text-sm leading-normal">
                  <span className="font-semibold text-slate-900">
                    {userInfo.name}
                  </span>
                  <br />
                  <span className="text-slate-900">{userInfo.email}</span>
                </p>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-slate-700 transition-all hover:bg-slate-200 focus:bg-slate-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-slate-700 transition-all hover:bg-slate-200 focus:bg-slate-300"
              >
                Logout
              </button>
            </nav>
          )}
        </div>
      ) : (
        <MenuItem url="/login" label="Login" icon={UserIcon} />
      )}
    </nav>
  );
};

export default DeskTopMenu;

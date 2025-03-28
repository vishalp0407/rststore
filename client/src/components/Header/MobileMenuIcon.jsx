import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const MobileMenuIcon = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="sm:hidden block hover:cursor-pointer "
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <XMarkIcon className="h-6 w-6 text-slate-900" />
      ) : (
        <Bars3Icon className="h-6 w-6 text-slate-900" />
      )}
    </button>
  );
};

export default MobileMenuIcon;

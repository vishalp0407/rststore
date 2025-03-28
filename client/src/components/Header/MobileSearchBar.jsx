import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const MobileSearchBar = () => {
  return (
    <div className="relative block px-4 py-2 w-full sm:hidden">
      <MagnifyingGlassIcon className="absolute left-7 top-5 h-4 w-4 text-slate-400" />
      <input
        type="search"
        placeholder="What are you looking for?"
        className="h-10 w-full rounded-lg bg-slate-200 px-4 pl-10 text-sm outline-slate-300 placeholder:text-slate-500"
      />
    </div>
  );
};

export default MobileSearchBar;

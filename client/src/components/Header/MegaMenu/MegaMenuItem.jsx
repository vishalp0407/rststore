const MegaMenuItem = ({ label, currentMenu, setCurrentMenu }) => {
  return (
    <button
      className="text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
      onClick={() => {
        if (currentMenu !== label) {
          setCurrentMenu(label);
        } else {
          setCurrentMenu(null);
        }
      }}
    >
      {label}
    </button>
  );
};
export default MegaMenuItem;

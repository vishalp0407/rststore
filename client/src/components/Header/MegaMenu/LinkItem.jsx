const LinkItem = ({ url, label }) => {
  return (
    <li>
      <a
        href={url}
        className="text-sm text-slate-700 transition-all hover:text-slate-900 hover:underline"
      >
        {label}
      </a>
    </li>
  );
};

export default LinkItem;

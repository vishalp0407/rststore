import { Link } from "react-router-dom";
const CategoryImageBox = ({ url, imageUrl, label }) => {
  return (
    <div>
      <Link to={url} className="relative block rounded-xl overflow-hidden">
        <span className="absolute bottom-10 z-10 text-sm font-semibold uppercase tracking-wide bg-white left-1/2 -translate-1/2 translate-y-1/2 py-2 px-3 rounded-lg text-center">
          {label}
        </span>
        <img
          className="w-full rounded-xl h-64 object-cover object-top hover:scale-105 transition-all duration-500"
          src={imageUrl}
          alt={label}
        />
      </Link>
    </div>
  );
};

export default CategoryImageBox;

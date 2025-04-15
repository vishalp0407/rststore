import React from "react";

const ItemQuantityDropdown = ({ index, product, handleAddToCart }) => {
  return (
    <>
      <label htmlFor={`quantity-${index}`} className="sr-only">
        Quantity, {product.name}
      </label>
      <select
        id={`quantity-${index}`}
        value={product.qty}
        onChange={(e) => handleAddToCart(product, +e.target.value)}
        className="min-w-12 max-w-full rounded-md border border-gray-300 px-1.5 py-1.5 text-left text-base font-medium leading-5 text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      >
        {[...Array(product.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
    </>
  );
};

export default ItemQuantityDropdown;

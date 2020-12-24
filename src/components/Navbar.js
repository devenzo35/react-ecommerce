import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = () => {

  const { products } = useSelector(state => state.cart)

  return (
    <div className="fixed z-10 top-0 h-12">
      <nav className="bg-gray-800 h-full w-screen mx-auto flex flex-row items-center justify-between sm:h-5/6">
        <Link
          className="text-white p-3 text-xl font-medium"
          to="/"
        >
          <i className="fas fa-list"></i>
        </Link>

        <Link
          className="text-white px-3 py-2 rounded-md text-sm font-medium"
          to="/cart"
        > 
          <i className="fas fa-shopping-cart icon-2x text-lg mr-1"></i>
          {(products.length > 0)?products.length:''}
        </Link>
      </nav>
    </div>
  );
};

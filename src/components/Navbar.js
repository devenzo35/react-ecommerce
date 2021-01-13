import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../store/actions/auth";

export const Navbar = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(startLogout());
  };

  return (
    <div className="fixed z-10 top-0 h-12">
      <nav className="bg-gray-800 h-full w-screen mx-auto flex flex-row items-center justify-between sm:h-6/6">
        <Link className="text-white p-3 text-2xl font-medium" to="/">
          <i className="fas fa-home"></i>
        </Link>

        <div className="h-full flex items-center">
          <Link
            className="text-white px-3 py-2 text-sm font-medium sm:mr-5"
            to="/cart"
          >
            <i className="fas fa-shopping-cart  text-2xl mr-1"></i>
            {products.length > 0 ? products.length : ""}
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-2 text-xs font-medium sm:mr-5"
            to="/cart"
          >
            <i className="fas fa-sign-out-alt fa-x7"></i>
            <br />
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

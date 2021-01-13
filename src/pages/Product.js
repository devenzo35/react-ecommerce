import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { idFilter } from "../helper/idFilter";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/actions/cart";
import { useForm } from "../hooks/useForm";
import { Loader } from "../components/Loader";

import queryString from "query-string";

export default function Product() {
  const [productById, setProductById] = useState([]);
  const location = useLocation();
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [formValue, handleOnChange] = useForm({
    amount: "",
  });

  const parsed = queryString.parse(location.search);

  const { id, name, description, priceInfo, images } = productById || "";

  const { unit } = priceInfo || "";

  const parseUnit = typeof unit === "string" ? unit.slice(0, -2) : unit;

  useEffect(() => {
    idFilter(parsed.pr).then((res) => setProductById(res));
  }, [parsed.pr]);

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        ...productById,
        amount: formValue.amount,
        priceInfo: {
          ...priceInfo,
          unit: (priceInfo.unit =
            formValue.amount !== ""
              ? parseInt(parseUnit, 10) * parseInt(formValue.amount, 10)
              : parseInt(parseUnit, 10)),
        },
      })
    );
  };

  localStorage.setItem("cartProducts", JSON.stringify(products));
  const isOnCart = products.some((product) => product.id === id);

  if (productById.length === 0) return <Loader />;

  return (
    <div className="h-screen">
      <figure className="mt-14 relative w-10/12 h-4/6 border-gray-300 rounded-sm border m-auto p-3 pt-6 sm:flex sm:flex-row sm:justify-center sm:pt-3 sm:mt-12 sm:h-5/6 sm:w-11/12 sm:border-none">
        <img
          className="w-full m-auto max-h-40 rounded-sm sm:w-7/12 sm:max-h-full sm:h-full sm:m-0"
          src={images}
          alt={name}
        ></img>

        <figcaption className="flex flex-col rounded-md justify-between h-2/6 sm:p-10 sm:ml-5 sm:w-5/12 sm:border sm:h-full sm:justify-start sm:bg-gray-100 sm:shadow-inner">
          <h1 className="text-3xl font-semibold sm:text-center sm:text-4xl sm:font-normal sm:mb-7">
            {name}
          </h1>

          <span className="text-2xl absolute bottom-2 right-2 sm:static sm:text-center sm:text-4xl sm:font-light sm:mb-14">
            ${parseUnit}
          </span>

          <p className="text-xl tracking-wide leading-7 break-words sm:text-center">
            {description}
          </p>
        </figcaption>
      </figure>

      <form className="flex justify-center mt-5 h-20 sm:justify-end sm:w-11/12 sm:-mt-32 sm:-ml-8">
        <input
          type="number"
          name="amount"
          onChange={handleOnChange}
          value={formValue.amount}
          placeholder="1"
          className="border p-2 w-6/12 text-2xl rounded-l-sm border-gray-400 z-20 sm:w-2/12"
        ></input>
        {isOnCart ? (
          <Link
            to="/cart"
            type="button"
            className="bg-red-500 border border-gray-400 w-4/12 rounded-r-sm grid place-items-center sm:w-1/12 font-semibold text-white z-20"
          >
            Go to cart
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            type="button"
            className="bg-blue-400 border border-gray-400 w-4/12 rounded-r-sm sm:w-1/12  font-semibold text-white z-20"
          >
            Add to cart
          </button>
        )}
      </form>

    </div>
  );
}

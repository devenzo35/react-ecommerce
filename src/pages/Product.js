import React, { useEffect, useState } from "react";
import queryString from "query-string";

import { Link, useLocation } from "react-router-dom";
import { idFilter } from "../helper/idFilter";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/actions/cart";
import { useForm } from "../hooks/useForm";

export default function Product() {
  const location = useLocation();
  const [buttonChange, setButtonChange] = useState(false);

  const parsed = queryString.parse(location.search);

  const [state, setstate] = useState([]);
  const dispatch = useDispatch();
  const [formValue, handleOnChange] = useForm({
    amount: "",
  });

  useEffect(() => {
    idFilter(parsed.pr).then((res) => setstate(res));
  }, [parsed.pr]);

  const {  name, description, priceInfo, images } = state[0] || "";
  const { unit } = priceInfo || "";

  const parseUnit = typeof unit === "string" ? unit.slice(0, -2) : unit;

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        name,
        description,
        priceInfo: {
          ...priceInfo,
          unit: (priceInfo.unit =
            formValue.amount !== ""
              ? parseInt(parseUnit, 10) * parseInt(formValue.amount, 10)
              : parseInt(parseUnit, 10)),
        },
        images,
        amount: formValue.amount,
      })
    );

    setButtonChange(true);
  };

  /* const handleDelete=()=>{
    console.log(id)
     dispatch ( startDeleteProduct(id) )
  } */

  return (
    <div className="h-screen">
      <figure className="mt-24 relative w-10/12 h-3/5 border-gray-300 rounded-sm border m-auto p-3 pt-6 sm:flex sm:flex-row sm:justify-start sm:pt-3 sm:mt-16 sm:h-4/6">

        <img className="w-full m-auto max-h-40 sm:w-5/12 sm:max-h-full sm:h-full sm:m-0" src={images} alt={name}></img>

        <figcaption className="flex flex-col justify-between h-2/6 sm:ml-5 sm:w-5/12">
          <h1 className="text-3xl font-semibold md:text-2xl">{name}</h1>
          <p className="text-xl tracking-wide leading-7 break-words">{description}</p>
        </figcaption>

        <span className="text-2xl absolute bottom-2 right-2 sm:top-3.5 sm:right-5">
            $
          {parseUnit}
        </span>
      </figure>
      
      <form className="flex justify-center mt-5 h-20 sm:justify-end sm:w-11/12 sm:-mt-32 sm:-ml-8">
        <input
          type="number"
          name="amount"
          onChange={handleOnChange}
          value={formValue.amount}
          placeholder="1"
          className="border p-2 w-6/12 text-2xl rounded-l-sm border-gray-400 sm:w-2/12 z-20"
        ></input>
        {buttonChange ? (
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
      
      {/* <Link to="/"  className="w-20 bg-green-200 m-auto">Delete product</Link> */}

      

    </div>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../store/actions/cart";

export const CartCards = ({ id, name, images, priceInfo, amount }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteCartItem(id));
  };

  return (
    <figure
      className="m-auto p-3 w-full flex flex-row border-b border-gray-400 md:w-9/12 md:border-b relative items-center"
      price={priceInfo.priceId}
    >
      <img className="w-2/5 max-h-24 sm:w-1/5" src={images} alt={name} />

      <div className="text-center w-6/12">
        <h1 className="text-center text-xl text-light mb-5">{name}</h1>

        {
          <figcaption className="bg-blue-500 text-white m-auto w-28 rounded-lg">
            {amount
              ? `x${amount} ${priceInfo.currency} ${priceInfo.unit}`
              : `${priceInfo.currency} ${priceInfo.unit}`}
          </figcaption>
        }
      </div>

      <button
        onClick={handleDeleteItem}
        className="border-red-600 border rounded-md mt-2 w-6 h-6 ml-28 absolute text-sm top-0 right-1 text-xs sm:static sm:w-20 sm:h-10 sm:bg-red-500 sm:inner-shadow sm:ml-32 sm:text-white"
      >
        <i className="far fa-trash-alt"></i>
      </button>
    </figure>
  );
};

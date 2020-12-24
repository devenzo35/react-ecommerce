import React from "react";

export const CartCards = ({ name, images, priceInfo, amount }) => {
  return (
    <figure
      className="m-auto p-3 w-full flex flex-row justify-between border-b border-gray-400 md:w-10/12 md:border-b"
      price={priceInfo.priceId}
    >
      <img className="w-2/5 max-h-24 sm:w-1/5" src={images} alt={name} />

      <div className="text-center w-6/12">
        <h1 className="text-center text-xl text-light mb-5">{name}</h1>

        {
          <figcaption className="bg-blue-500 text-white m-auto w-28 rounded-md">
            {(amount)
              ? `x${amount} ${priceInfo.currency} ${priceInfo.unit}`
              : `${priceInfo.currency} ${priceInfo.unit}`
            }
          </figcaption>
        }
      </div>
    </figure>
  );
};

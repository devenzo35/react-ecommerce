import React from "react";

export const Cards = ({ name, images, priceInfo }) => {
  return (
    <figure className="w-10/12 m-auto bg-white mb-7 h-80 shadow-lg p-5 flex flex-col justify-between transform transition duration-100 sm:w-80 sm:border hover:scale-95 hover:shadow-sm">
      <img className="w-full m-auto max-h-44" src={images} alt={name} />

      <div className="w-full border-t p-1 mb-0 border-gray-700">
        <h1 className="font-semibold text-2xl md:text-xl">{name}</h1>

        <figcaption className="text-2xl md:text-xl">
          {priceInfo.currency.toUpperCase()}
          {priceInfo.unit.slice(0, -2)}
        </figcaption>
      </div>
    </figure>
  );
};

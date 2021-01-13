import React from "react";
import loader from "../assets/tail-spin.svg";

export const Loader = () => {
  return (
    <div className="grid place-items-center h-screen">
      <img src={loader} alt="loader"></img>
    </div>
  );
};

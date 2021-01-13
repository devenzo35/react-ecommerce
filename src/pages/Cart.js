import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CartCards } from "../components/CartCards";
import { CheckoutForm } from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
  const { products } = useSelector((state) => state.cart);
  const [showPaymentForm, setPaymentForm] = useState(false);

  localStorage.setItem("cartProducts", JSON.stringify(products));

  const prices = products.map((product) => product.priceInfo.unit);

  const handleSubmit = () => setPaymentForm(true);

  const stripePromise = loadStripe(
    "pk_test_51HxMyeFjaqj6StBqxH7qGQDgMFsPUf5RJbOBB2c5UuO0oL0OfW81QY8VTZ3J6kVdMDg8U9qHq64DSR2bcKSKGgFX00b2C14se0"
  );

  if (!products.length) {
    return (
      <h1 className="flex flex-col justify-center items-center h-screen">
        There is no products in the cart
      </h1>
    );
  }

  const finalPrice = prices.reduce((n, currentN) => n + currentN);

  return (
    <div className="h-screen overflow-y-auto md:overflow-y-hidden">
      <ul className="mt-14 h-4/6 overflow-y-auto sm:mt-10">
        {products.map((e) => {
          return (
            <li key={e.name}>
              <CartCards {...e} />
            </li>
          );
        })}
      </ul>

      <div className="relative bg-white bottom-0 border-t border-gray-300 flex flex-col items-center w-full h-34 md:h-1/5">
        <section className="bg-white p-4 text-md h-2/5 w-full text-center text-gray-600 flex flex-row justify-between sm:w-4/12 sm:p-2">
          {" "}
          <span>Sub total:</span> <span>usd {finalPrice}</span>
        </section>

        <button
          role="link"
          className="bg-blue-500 text-center rounded-sm h-16 w-11/12 text-gray-100 text-2xl sm:w-3/12 sm:h-12 sm:mt-3"
          onClick={handleSubmit}
        >
          Go to checkout
        </button>
      </div>

      {showPaymentForm ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            finalPrice={finalPrice}
            setPaymentForm={setPaymentForm}
          />
        </Elements>
      ) : (
        ""
      )}
    </div>
  );
}

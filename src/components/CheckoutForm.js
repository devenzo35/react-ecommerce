import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { cleanCart } from "../store/actions/cart";
import Swal from "sweetalert2";
import { CARD_ELEMENT_OPTIONS } from "../helper/cartPayStyle";

export const CheckoutForm = ({ finalPrice, setPaymentForm }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [formValue, handleOnChange] = useForm({
    name: "",
    email: "",
  });
  const dispatch = useDispatch();

  const { name, email } = formValue;

  const handlePay = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    fetch("/secret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: finalPrice + "00" }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        var clientSecret = responseJson.client_secret;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: name,
              email: email,
            },
          },
        });

        if (result.error) {
          Swal.fire(
            "The payment could not be processed!",
            result.error.message,
            "error"
          );
        } else {
          if (result.paymentIntent.status === "succeeded") {
            Swal.fire(
              "Payment success!",
              "thanks you for your purchase!",
              "success"
            );
            setPaymentForm(false);
            dispatch(cleanCart());
            localStorage.setItem("cartProducts", "[]");
          }
        }
      });
  };

  const handleClosePay = (e) => {
    setPaymentForm(false);
  };

  return (
    <div className="h-screen w-full bg-black bg-opacity-80 grid place-items-center absolute clickable top-0 z-10">
      <form
        onSubmit={handlePay}
        className="bg-gray-100 w-11/12 h-4/6 rounded-sm flex flex-col relative items-center justify-evenly shadow-md p-1 animate__animated animate__fadeInRight sm:w-5/12 sm:h-5/6"
      >
        <button
          onClick={handleClosePay}
          type="button"
          className="rounded-full position w-7 h-7 grid place-items-center border-2 border-gray-900 absolute -top-2 -right-2 bg-red-300 hover:bg-red-400"
        >
          <i className="fas fa-times"></i>
        </button>

        <input
          type="text"
          value={name}
          onChange={handleOnChange}
          name="name"
          placeholder="Owner"
          className="w-10/12 text-md outline-none bg-transparent p-1 border-b-2 border-gray-800"
          required
        ></input>

        <input
          value={email}
          onChange={handleOnChange}
          name="email"
          type="email"
          placeholder="Email"
          className="w-10/12 bg-transparent outline-none text-md p-1 border-b-2 border-gray-800"
          required
        ></input>

        <CardElement
          className="w-10/12 text-md bg-transparent p-1 border-b-2 border-indigo-800"
          options={CARD_ELEMENT_OPTIONS}
        />

        <button
          className="bg-indigo-700 text-md w-10/12 h-9 rounded-sm text-white"
          type="submit"
          disabled={!stripe}
        >
          Pay ${finalPrice}
        </button>
      </form>
    </div>
  );
};

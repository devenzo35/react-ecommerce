import { types } from "../types/types";

export const loadCart = () => ({
  type: types.LoadCart,
  payload: JSON.parse(localStorage.getItem("cartProducts")) || [],
});

export const addProduct = (product) => ({
  type: types.AddToCart,
  payload: product,
});

export const deleteCartItem = (id) => ({
  type: types.DeleteCartItem,
  payload: id,
});

export const cleanCart = () => ({ type: types.CleanCart });

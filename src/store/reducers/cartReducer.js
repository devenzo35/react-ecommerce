import { types } from "../types/types";

const initialState = {
  products: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LoadCart: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case types.AddToCart:
      console.log(action.payload)
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case types.DeleteCartItem:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case types.CleanCart:
      return {
        ...state,
        products: [],
      };

    default:
      return state;
  }
};

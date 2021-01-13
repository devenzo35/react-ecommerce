import { types } from "../types/types";

const initialState = {
  products: [],
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LoadProducts:
      return {
        ...state,
        products: action.payload,
      };

    case types.addNewProduct:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };

    default:
      return state;
  }
};

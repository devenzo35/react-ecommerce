import { types } from "../types/types";

const initialState = {
  user: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.registerUser:
      return {
        ...state,
        user: action.payload ,
      };

    case types.logout:
      return {
        user:null
      };

    default:
      return state;
  }
};

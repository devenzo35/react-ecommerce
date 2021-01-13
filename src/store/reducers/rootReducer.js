import { combineReducers } from "redux";
import { AuthReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { homeReducer } from "./homeReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  home: homeReducer,
  cart: cartReducer,
});

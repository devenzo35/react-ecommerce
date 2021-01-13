import { types } from "../types/types";

export const loginUser = (name, uid) => ({
  type: types.registerUser,
  payload: { name, uid },
});

export const startLogout = () => ({
  type: types.logout,
});

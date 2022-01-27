import { EDIT_USER } from "../constants";

export const editUser = (payload) => ({
  type: EDIT_USER,
  payload,
});

import { DELETE_USER } from "../constants";

export const deleteUser = (payload) => ({
  type: DELETE_USER,
  payload,
});

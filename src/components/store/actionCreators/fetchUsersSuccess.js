import { SET_SUCCESS } from "../constants";

export const fetchUsersSuccess = (payload) => ({
  type: SET_SUCCESS,
  payload,
});

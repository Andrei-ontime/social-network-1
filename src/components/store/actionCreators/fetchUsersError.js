import { SET_ERROR } from "../constants";

export const fetchUsersError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

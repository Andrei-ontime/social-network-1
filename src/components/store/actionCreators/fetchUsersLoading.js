import { SET_LOADING } from "../constants";

export const fetchUsersLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

import { FETCH_USERS } from "../constants";

export const fetchUsers = (payload) => ({
  type: FETCH_USERS,
  payload,
});

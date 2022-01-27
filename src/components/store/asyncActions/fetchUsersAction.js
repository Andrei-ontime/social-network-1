import axios from "axios";
import { fetchUsers } from "../actionCreators/fetchUsers";
import { fetchUsersError } from "../actionCreators/fetchUsersError";
import { fetchUsersLoading } from "../actionCreators/fetchUsersLoading";

export const fetchUsersAction = (dispatch) => {
  dispatch(fetchUsersLoading());
  axios
    .get("https://randomuser.me/api/?results=10")
    .then(function (response) {
      dispatch(fetchUsers(response.data.results));
    })
    .catch(function (error) {
      dispatch(fetchUsersError(error.message));
    })
};

import axios from "axios";
import { fetchUsers } from "../actionCreators/fetchUsers";
import { fetchUsersError } from "../actionCreators/fetchUsersError";
import { fetchUsersLoading } from "../actionCreators/fetchUsersLoading";
import { fetchUsersSuccess } from "../actionCreators/fetchUsersSuccess";

export const fetchUsersAction = (dispatch) => {
  dispatch(fetchUsersLoading(true));
  axios
    .get("https://randomuser.me/api/?results=10")
    .then(function (response) {
      dispatch(fetchUsers(response.data.results));
      dispatch(fetchUsersSuccess(true));
      dispatch(fetchUsersLoading(false));
    })
    .catch(function (error) {
      dispatch(fetchUsersError(error.message));
      fetchUsersLoading(false);
    })
    .finally(function () {
      fetchUsersLoading(false);
    });
};

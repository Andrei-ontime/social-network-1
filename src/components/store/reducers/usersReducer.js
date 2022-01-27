import {
  SET_ERROR,
  FETCH_USERS,
  SET_LOADING,
  SET_SUCCESS,
  DELETE_USER,
  EDIT_USER,
} from "../constants";

export const initialState = {
  users: [],
  loading: false,
  success: false,
  error: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: [...action.payload] };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_SUCCESS:
      return { ...state, success: action.payload };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.login.uuid !== action.payload),
      };

    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.login.uuid === action.payload.login.uuid) {
            return (user = action.payload);
          }
          return user;
        }),
      };

    default:
      return state;
  }
};

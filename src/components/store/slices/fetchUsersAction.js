import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetch", () => {
  return axios
    .get("https://randomuser.me/api/?results=10")
    .then(function (response) {
      const fetchUsersData = response.data.results;
      return fetchUsersData;
    });
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteUser(state, action) {
      state.users = state.users.filter(
        (user) => user.login.uuid !== action.payload
      );
    },
    editUser(state, action) {
      state.users = state.users.map((user) => {
        if (user.login.uuid === action.payload.login.uuid) {
          return (user = action.payload);
        }
        return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;

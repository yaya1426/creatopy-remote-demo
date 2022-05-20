import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models/user";

export interface UserState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: UserState = {
  isAuthenticated: !!localStorage.getItem("access_token"),
  user: !!localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "")
    : null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;

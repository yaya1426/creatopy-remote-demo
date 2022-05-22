import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models/user";

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  resetPasswordFormStep: number;
  resetPasswordUsername: string | null;
}

const initialState: UserState = {
  isAuthenticated: !!localStorage.getItem("access_token"),
  user: !!localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "")
    : null,
  resetPasswordFormStep: 1,
  resetPasswordUsername: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; jwt: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      // Presist token to localStorage
      localStorage.setItem("access_token", action.payload?.jwt);
      localStorage.setItem("user", JSON.stringify(action.payload?.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },
    resetPasswordFormUsername: (state, action: PayloadAction<string | null>) => {
      state.resetPasswordUsername = action.payload;
    },
    resetPasswordFormStep: (state, action: PayloadAction<number>) => {
      state.resetPasswordFormStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  resetPasswordFormStep,
  resetPasswordFormUsername,
} = userSlice.actions;

export default userSlice.reducer;

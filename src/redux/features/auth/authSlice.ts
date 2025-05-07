import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// user type
export type TUserFromToken = {
  name?: string;
  email: string;
  password?: string;
  iat?: number;
  exp?: number;
  _id?: string;
  role?: "admin" | "customer";
  status?: "active" | "inactive" | "banned";
  needsPasswordChange?: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
};

// auth state
type TAuthState = {
  user: null | TUserFromToken;
  token?: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TAuthState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// exporting for using token and user from anywhere
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;

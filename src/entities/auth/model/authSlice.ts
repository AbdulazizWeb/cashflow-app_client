import { decodeJwt, type JwtClaims } from "@/shared/lib/decodeJwt";
import { tokenStorage } from "@/shared/lib/token";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  claims: JwtClaims | null;
};

const token = tokenStorage.get();

const initialState: AuthState = {
  isAuthenticated: Boolean(token),
  claims: token ? decodeJwt(token) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      const token = action.payload;
      tokenStorage.set(token);

      state.isAuthenticated = true;
      state.claims = decodeJwt(token);
    },

    logout(state) {
      tokenStorage.clear();
      state.isAuthenticated = false;
      state.claims = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  authToken: string | undefined;
  refreshToken: string | undefined;
  username: string | undefined;
  userId: string | undefined;
  messsages: number;
}

interface LogInReducerPayload {
  authToken: string;
  refreshToken: string;
  username: string;
  userId: string;
  messages: number;
}

const initialState: AuthState = {
  isLoggedIn: false,
  authToken: "",
  refreshToken: "",
  username: "",
  userId: "",
  messsages: 0
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<LogInReducerPayload>) => {
      state.isLoggedIn = true;
      state.authToken = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.messsages = action.payload.messages;
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.authToken = "";
      state.refreshToken = "";
      state.username = "";
      state.userId = "";
      state.messsages = 0;
    },
    removeMessage: (state) => {
      state.messsages--;
    }
  }
});

export const { logInUser } = authSlice.actions;
export const { logOutUser } = authSlice.actions;
export const { removeMessage } = authSlice.actions;

export default authSlice.reducer;

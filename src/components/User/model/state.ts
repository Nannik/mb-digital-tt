import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";
// maybe I should have add alias xD. I just don't want waste time on tsconfig end esbuild :)
import { TState } from "../../../app/model/types"; 

const userLocalStorageKey = 'user';

const initialState: UserState = {
  isAuth: false,
  email: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // no need for registration, always success login. no users in db.
    // action is just string payload that represents email.
    // I'd create form values interface if it has more than one field
    login(state, action: PayloadAction<string>) { 
      state.isAuth = true;
      state.email = action.payload;
      localStorage.setItem(userLocalStorageKey, action.payload);
    },
    logout(state) {
      state.isAuth = false;
      state.email = null;
      localStorage.removeItem(userLocalStorageKey);
    },
    init(state) {
      const email = localStorage.getItem(userLocalStorageKey);
      if (email) {
        state.isAuth = true;
        state.email = email;
      }
    }
  },
});

export const isAuthSelector = (state: TState) => state.userState.isAuth
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;


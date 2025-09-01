import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";
// maybe I should have add alias xD. I just don't want waste time on tsconfig end esbuild :)
import { TState } from "../../../app/model/types"; 

const userLocalStorageKey = 'user';

const initialState: UserState = {
  isAuth: false,
  email: null,

  formError: {
    email: null,
    password: null
  }
}

// https://stackoverflow.com/a/46181
const validateEmail = (email: string): string | null => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const err = !emailRegex.test(email)

  return err ? 'Incorrect format' : null;
};

const validatePassword = (pass: string): string | null => {
  if (pass.length < 6) return 'Enter at least 6 characters';

  if (/[а-я]/.test(pass)) return 'English, please';
  if (!/[a-z]/.test(pass)) return 'Enter at least one lower case character';
  if (!/[A-Z]/.test(pass)) return 'Enter at least one upper case character';
  if (!/[^a-zA-Z0-9]/.test(pass)) return 'Enter at least one special character';

  return null;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // no need for registration, always success login. no users in db.
    // action is just string payload that represents email.
    // I'd create form values interface if it has more than one field
    login(state, action: PayloadAction<{ email: string, password: string }>) { 
      state.formError = {
        email: null,
        password: null
      }

      let isErr = false;
      let err = validateEmail(action.payload.email);
      if (err) {
        state.formError.email = err;
        isErr = true;
      }

      err = validatePassword(action.payload.password);
      if (err) {
        state.formError.password = err;
        isErr = true;
      }

      if (isErr) return;

      state.isAuth = true;
      state.email = action.payload.email;
      localStorage.setItem(userLocalStorageKey, action.payload.email);
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

export const userSelector = (state: TState) => state.userState
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;


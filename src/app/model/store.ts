import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../../components/User/model/state";

export const store = configureStore({
  reducer: combineReducers([
    userReducer
  ])
});

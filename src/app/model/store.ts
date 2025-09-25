import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../../components/User/model/state";
import { useDispatch } from "react-redux";
import { coursesReducer } from "../../components/Course/model/state";
import { videoReducer } from "../../components/WatchModal/model/state";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    coursesState: coursesReducer,
    videoState: videoReducer
  } 
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

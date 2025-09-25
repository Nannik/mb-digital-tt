import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState } from "../../../app/model/types";
import { VideoState } from "./types";

const initialState: VideoState = {
  open: false,
  url: null,
  readyState: HTMLMediaElement.HAVE_NOTHING
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    setUrl(state, action: PayloadAction<string>) {
      if (state.url !== action.payload)
        state.readyState = HTMLMediaElement.HAVE_NOTHING;

      state.url = action.payload;
    },
    updateReadyState(state, action: PayloadAction<number>) {
      state.readyState = action.payload;
    }
  },
});

export const videoSelector = (state: TState) => state.videoState;
export const videoActions = videoSlice.actions;
export const videoReducer = videoSlice.reducer;


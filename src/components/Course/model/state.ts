import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CourseState } from "./types";
import { fetchCourses } from "./thunk";
import { TState } from "../../../app/model/types";

const initialState: CourseState = {
  loading: true,
  error: null,
  courses: []
}

const coursesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
      state.loading = false;
      state.error = null;
      state.courses = action.payload;
    })
    .addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? null;
      state.courses = [];
    })
  }
});

export const isLoadingSelector = (state: TState) => state.coursesState.loading
export const errorSelector = (state: TState) => state.coursesState.error
export const coursesSelector = (state: TState) => state.coursesState.courses
export const coursesActions = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;


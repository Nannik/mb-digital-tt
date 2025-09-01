import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CourseState } from "./types";
import { fetchCourses, buy } from "./thunk";
import { TState } from "../../../app/model/types";

const initialState: CourseState = {
  loading: true,
  error: null,
  courses: []
}

const coursesSlice = createSlice({
  name: 'video',
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
    .addCase(buy.pending, (state, action) => {
      if (!state.courses) return;

      const id = action.meta.arg;
      const course = state.courses.find(c => c.id === id)
      if (course) {
        course.loading = true;
      }
    })
    .addCase(buy.fulfilled, (state, action) => {
      if (!state.courses) return;

      const id = action.meta.arg;
      const course = state.courses.find(c => c.id === id)
      if (course) {
        course.loading = false;
        course.videoUrl = action.payload;
      }
    })
    .addCase(buy.rejected, (state, action) => {
      if (!state.courses) return;

      const id = action.meta.arg;
      const course = state.courses.find(c => c.id === id)
      if (course) {
        course.loading = false;
        state.error = action.payload ?? null;
      }
    })
  }
});

export const coursesSelector = (state: TState) => state.coursesState;
export const coursesActions = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;


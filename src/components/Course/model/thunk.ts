import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../shared/api";
import { Course } from "./types";
import { ThunkConfig } from "../../../app/model/types";

export const fetchCourses = createAsyncThunk<Course[], void, ThunkConfig<string>>(
  'courses/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await api.get<Course[]>('/courses');
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const buy = createAsyncThunk(
  'courses/buy',
  async (id: number, thunkAPI) => {
    try {
      const res = await api.post<string>('/pay', { id });
      return res.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e)
      return '';
    }
  }
)

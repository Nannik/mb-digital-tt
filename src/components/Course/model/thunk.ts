import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../shared/api";
import { Course } from "./types";
import { ThunkConfig } from "../../../app/model/types";

export const fetchCourses = createAsyncThunk<Course[], void, ThunkConfig<string>>(
  'courses/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await api.get<Exclude<Course, 'loading'>[]>('/courses');
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const buy = createAsyncThunk<string, number, ThunkConfig<string>>(
  'courses/buy',
  async (id: number, thunkAPI) => {
    try {
      const res = await api.post<string>('/pay', { id });
      return res.data;
    } catch (e) {
      let msg = e.response?.data?.message;
      if (!msg) msg = e.message;
      if (!msg) msg = 'error happened';
      
      return thunkAPI.rejectWithValue(msg)
    }
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (data, thunkAPI) => {
    try {
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, thunkAPI) => {
    try {
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

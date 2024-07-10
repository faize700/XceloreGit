// src/store/reducers/authReducer.js

import { createSlice } from '@reduxjs/toolkit';
import { AUTH_LOGOUT } from '../actions/types'; // Import AUTH_LOGOUT action type if needed

const initialState = {
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null; // Clear error when setting user
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AUTH_LOGOUT, (state) => {
      state.user = null;
      state.token = null;
      state.error = null; // Clear error on logout
    });
  },
});

export const { setUser, setError, logout } = authSlice.actions;

export default authSlice.reducer;

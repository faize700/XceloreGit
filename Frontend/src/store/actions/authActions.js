import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../components/Notification';
import { registerUser as apiRegisterUser } from '../../services/api';

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
      state.error = null; 
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setError, clearError, logout } = authSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await apiRegisterUser(userData);
    dispatch(setUser(data));
   
    console.log('Registration successful', userData);
  } catch (error) {
    console.log(error);
   
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', userData, { withCredentials: true });
    console.log("Response from login API:", response.data);
    const { user, token } = response.data;
    dispatch(setUser({ user, token }));
    notifySuccess('Login successful');
  } catch (error) {
    console.error('Error logging in user:', error.response?.data || error.message);
    dispatch(setError(error.response?.data.message || 'Login failed'));
    notifyError('Login failed');
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
    dispatch(logout());
    notifySuccess('Logout successful');
  } catch (error) {
    console.error('Error logging out user:', error.message);
    notifyError('Logout failed');
  }
};

export default authSlice.reducer;

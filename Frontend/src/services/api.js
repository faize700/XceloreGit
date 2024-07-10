import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

export const getUsers = async ({ page, limit, search }) => {
  try {
    const response = await axios.get(`${baseURL}/users`, {
      params: { page, limit, search },
    });
    return response.data; // return users directly
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/users`, userData);
    return response.data.message; // return message directly
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${baseURL}/users/${userId}`, userData);
    return response.data.message; // return message directly
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${userId}`);
    return response.data.message; // return message directly
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, userData);
    return response.data.message; // return message directly
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userData);
    return response.data; // return the full response (message, user, token)
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

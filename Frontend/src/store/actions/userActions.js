// actions/userActions.js
import axios from 'axios';
import { setUsers, addUser, editUser, removeUser } from '../reducers/userReducer';

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    dispatch(setUsers(response.data.users));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users', userData);
    dispatch(addUser(response.data.user));
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, userData);
    dispatch(editUser(response.data.user));
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${userId}`);
    dispatch(removeUser(userId));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/actions/authActions';
import { Button, Typography } from '@mui/material'; // Import Material-UI components

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook from React Router

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login'); // Use navigate function to redirect
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4">Congratulations! You are logged in.</Typography>
      <Button onClick={handleLogout} variant="contained" color="secondary" style={{ marginTop: '20px' }}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;

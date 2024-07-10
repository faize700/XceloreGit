import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

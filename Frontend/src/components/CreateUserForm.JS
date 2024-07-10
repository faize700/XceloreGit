// CreateUserForm.jsx
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const CreateUserForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement API call to POST user data
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Role"
        name="role"
        value={userData.role}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Create User
      </Button>
    </form>
  );
};

export default CreateUserForm;

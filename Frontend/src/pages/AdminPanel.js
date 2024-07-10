import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination as MuiPagination, Select, MenuItem, Box
} from '@mui/material';
import { notifyError, notifySuccess } from '../components/Notification';
import { Edit, Delete } from '@mui/icons-material';
import { createUser, deleteUser, getUsers, updateUser } from '../services/api';
import { setUsers } from '../store/reducers/userReducer';
import { selectUsers } from '../selectors/userSelectors';
import { logoutUser } from '../store/actions/authActions';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', role: 'User', password: '' });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers({ page, limit, search });
      console.log(response.users);
      dispatch(setUsers(response));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleCreateOrUpdate = async () => {
    try {
      if (editId) {
        const message = await updateUser(editId, form);
        console.log(message);
        notifySuccess(message);
        setEditId(null);
      } else {
        const message = await createUser(form);
        console.log(message);
        notifySuccess(message);
      }
      setForm({ firstName: '', lastName: '', email: '', role: 'User', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating/updating user:', error);
      notifyError(error);
    }
  };

  const handleEdit = (user) => {
    setForm({ ...user, password: '' });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      const message = await deleteUser(id);
      console.log(message);
      notifySuccess(message);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      notifyError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
        <Typography variant="h4" component="h1">
          Admin Panel
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleCreateOrUpdate}>
              {editId ? 'Update User' : 'Create User'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(user._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
        <MuiPagination
          count={Math.ceil(users.length / limit) || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Grid>
    </Container>
  );
};

export default AdminPanel;

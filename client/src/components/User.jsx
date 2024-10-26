import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box,  useTheme,useMediaQuery, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function Users() {
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    useEffect(() => {
        axios.get('http://localhost:3001') // Ensure the correct API endpoint
            .then(result => {
                if (Array.isArray(result.data)) {
                    setUsers(result.data);
                } else {
                    console.error('API response is not an array');
                    setUsers([]);
                }
            })
            .catch(err => {
                console.error('Error fetching users:', err);
                setUsers([]);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
          .then(res => {
            console.log(res);
            setUsers(users.filter(user => user._id !== id));
          })
          .catch(err => console.log(err));
      };

    return (
        <Box m="20px">
            <Button
                component={Link}
                to="/createUser"
                variant="contained"
                sx={{
                     mb: 3, backgroundColor: "#ffe8b5", color: "#191f45" }}
            >
                Add +
            </Button>
            <TableContainer component={Paper} sx={{ backgroundColor: "#21295C" }}>
        <Table>
          <TableHead>
          <TableRow sx={{ backgroundColor: "#1a1f4c" }}>
    <TableCell sx={{ color: "#FFFFFF" }}>Therapies</TableCell>
    <TableCell sx={{ color: "#FFFFFF" }}>Description</TableCell>
    <TableCell sx={{ color: "#FFFFFF" }}>Action</TableCell>
</TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell sx={{ color: "#FFFFFF" }}>{user.therapy_name}</TableCell>
                                <TableCell sx={{ color: "#FFFFFF" }}>{user.description}</TableCell>
                                <TableCell>
                                    <IconButton
                                        component={Link}
                                        to={`/updateUser/${user._id}`}
                                        sx={{ color: "#ffe8b5" }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(user._id)}
                                        sx={{ color: "red" }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan="3" sx={{ color: "#FFFFFF" }}>No therapies found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Users;

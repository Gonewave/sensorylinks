import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function Needs() {
    const [needs, setNeeds] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/needs')
            .then(result => {
                if (Array.isArray(result.data)) {
                    setNeeds(result.data);
                } else {
                    console.error('API response is not an array');
                    setNeeds([]);
                }
            })
            .catch(err => {
                console.error('Error fetching needs:', err);
                setNeeds([]);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteNeeds/${id}`)
          .then(res => {
            console.log(res);
            setNeeds(needs.filter(user => user._id !== id));
          })
          .catch(err => console.log(err));
      };

    return (
        <Box m="20px">
            <Button
                component={Link}
                to="/createneeds"
                variant="contained"
                sx={{ mb: 3, backgroundColor: "#ffe8b5", color: "#191f45" }}
            >
                Add +
            </Button>
            <TableContainer component={Paper} sx={{ backgroundColor: "#21295C" }}>
        <Table>
          <TableHead>
          <TableRow sx={{ backgroundColor: "#1a1f4c" }}>
    <TableCell sx={{ color: "#FFFFFF" }}>Special Needs</TableCell>
    <TableCell sx={{ color: "#FFFFFF" }}>Disorder</TableCell>
    <TableCell sx={{ color: "#FFFFFF" }}>Action</TableCell>
</TableRow>
                    </TableHead>
                    <TableBody>
                        {needs.length > 0 ? needs.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell sx={{ color: "#FFFFFF" }}>{user.need_name}</TableCell>
                                <TableCell sx={{ color: "#FFFFFF" }}>{user.disorder}</TableCell>
                                <TableCell>
                                    <IconButton
                                        component={Link}
                                        to={`/updateneeds/${user._id}`}
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
                                <TableCell colSpan="3" sx={{ color: "#FFFFFF" }}>No special needs found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Needs;

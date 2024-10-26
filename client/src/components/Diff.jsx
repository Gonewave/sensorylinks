import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function Diffs() {
  const [difficulties, setDifficulties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/difficulties')
      .then(result => setDifficulties(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteDifficulties/${id}`)
      .then(res => {
        console.log(res);
        setDifficulties(difficulties.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <Box m="20px">
      <Button
        component={Link}
        to="/createdifficulties"
        variant="contained"
        sx={{ mb: 3, backgroundColor: "#ffe8b5", color: "#191f45" }}
      >
        Add +
      </Button>
      <TableContainer component={Paper} sx={{ backgroundColor: "#21295C" }}>
        <Table>
          <TableHead>
          <TableRow sx={{ backgroundColor: "#1a1f4c" }}>
    <TableCell sx={{ color: "#FFFFFF" }}>Difficulty</TableCell>
    <TableCell sx={{ color: "#FFFFFF" }}>Description</TableCell>
    <TableCell sx={{ color: "#FFFFFF" }}>Action</TableCell>
</TableRow>


          </TableHead>
          <TableBody>
            {difficulties.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ color: "#FFFFFF" }}>{user.dtitle}</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>{user.ddescription}</TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={`/updatedifficulties/${user._id}`}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Diffs;

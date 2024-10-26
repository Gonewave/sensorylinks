import React, { useState, useEffect } from 'react';
import { Box, useTheme, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Reflexes = () => {
  const [reflexes, setReflexes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentReflexId, setCurrentReflexId] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getReflex");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReflexes(data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const title = inputValue;
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:3001/updateReflex/${currentReflexId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });
      } else {
        response = await fetch('http://localhost:3001/createReflex', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      if (isEditing) {
        setReflexes(reflexes.map(reflex => (reflex._id === currentReflexId ? { ...reflex, title } : reflex)));
      } else {
        setReflexes([...reflexes, result]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setInputValue("");
      setIsEditing(false);
      setCurrentReflexId(null);
      const a = document.getElementById("closeModal");
      if (a) {
        a.click();
      } else {
        console.error('Close modal button not found');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteReflex/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setReflexes(reflexes.filter(reflex => reflex._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (reflex) => {
    setInputValue(reflex.title);
    setIsEditing(true);
    setCurrentReflexId(reflex._id);
  };

  const handleClose = () => {
    setInputValue('');
    setIsEditing(false);
    setCurrentReflexId(null);
  };

  const columns=[
    {
      field: "Reflex",
      headerName: "Reflex",
      flex: 1,
      renderCell: (params) => <div>{params.row.title}</div>,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      headerAlign: "center",
      renderCell: (params) => {
        return (
        <div style={{display:"flex",height:"50px",justifyContent:"center",alignItems:"center"}}>
          <div className="actions" style={{ display: "flex", alignItems: "center",alignContent:"center", justifyContent: "space-evenly" }}>
            <button style={{backgroundColor:"#ffe8b5",color:"#191f45"}} onClick={() => handleEdit(params.row)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-warning btn-sm mx-2">Edit</button>
            <button onClick={() => handleDelete(params.row._id)} className="btn btn-danger btn-sm">Delete</button>
           {/* <button className='btn'><i className="action-buttons" ><FontAwesomeIcon style={{ color: "red" }} icon={faTrashAlt} /></i></button> */}
          </div>
        </div>
        )
      }
    },
  ]

  return (
    <div className='mx-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Reflexes</h1>
        <button style={{backgroundColor:"#ffe8b5",color:"#191f45"}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Add Reflex
        </button>
      </div>
      <div className=''>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel"  style={{color: "black"}}>{isEditing ? 'Update Reflex' : 'Add Reflex'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button type="button" id="closeModal" style={{backgroundColor:"#ffe8b5",color:"#191f45"}} className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">Close</button>
              <button type="button" style={{backgroundColor:"#ffe8b5",color:"#191f45"}} onClick={handleSubmit} className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
            </div>
          </div>
        </div>
      </div>
      <Box>
        <Box
          mt="40px"
          height="75vh"
          width="40vw"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            getRowId={(row) => row._id}
            rows={reflexes || []}
            columns={columns}
          />
        </Box>
      </Box>
    </div>
    </div>
  );
};

export default Reflexes;

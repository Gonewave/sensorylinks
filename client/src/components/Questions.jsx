import React, { useState, useEffect } from 'react';
import { Box, useTheme, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Questions = () => {
  const [senses, setSenses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedSense, setSelectedSense] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const theme = useTheme();

  const fetchData = async () => {
    try {
      const senseResponse = await fetch("http://localhost:3001/getSense");
      const sensesData = await senseResponse.json();
      setSenses(sensesData);

      const questionResponse = await fetch("http://localhost:3001/getQuestion");
      const questionsData = await questionResponse.json();
      setQuestions(questionsData);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        const response = await fetch(`http://localhost:3001/updateQuestion/${currentQuestionId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: inputValue }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        await response.json();
        fetchData();
      } else {
        const response = await fetch("http://localhost:3001/createQuestion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: inputValue,
            senseId: selectedSense,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        await response.json();
        fetchData();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setInputValue("");
      setSelectedSense("");
      setIsEditing(false);
      setCurrentQuestionId(null);
      const closeBtn = document.getElementById("closeQuestionModal");
      if (closeBtn) closeBtn.click();
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteQuestion/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (question) => {
    setInputValue(question.question);
    setIsEditing(true);
    setCurrentQuestionId(question._id);
  };

  const handleClose = () => {
    setInputValue('');
    setSelectedSense('');
    setIsEditing(false);
    setCurrentQuestionId(null);
  };

  const columns = [
    {
      field: "sense",
      headerName: "Sense",
      flex: 1,
      renderCell: (params) => <div>{params.row.sense.title}</div>,
    },
    {
      field: "question",
      headerName: "Question",
      flex: 2,
      renderCell: (params) => <div>{params.row.question}</div>,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", height: "50px", justifyContent: "center", alignItems: "center" }}>
            <div className="actions" style={{ display: "flex", alignItems: "center", alignContent: "center", justifyContent: "space-evenly" }}>
              <button style={{ backgroundColor: "#ffe8b5", color: "#191f45" }} onClick={() => handleEdit(params.row)} data-bs-toggle="modal" data-bs-target="#questionModal" className="btn btn-warning btn-sm mx-2">Edit</button>
              <button onClick={() => handleDelete(params.row._id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        );
      }
    },
  ];

  return (
    <div className='mx-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Questions</h1>
        <button style={{ backgroundColor: "#ffe8b5", color: "#191f45" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#questionModal">
          Add Question
        </button>
      </div>
      <div className=''>
        <div className="modal fade" id="questionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="questionModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="questionModalLabel" style={{color: "black"}}>{isEditing ? 'Update Question' : 'Add Question'}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {!isEditing && (
                  <div className="mb-3">
                    <label htmlFor="senseSelect" className="form-label" style={{color: "black"}}>Sense</label>
                    <select className="form-select" id="senseSelect" value={selectedSense} onChange={(e) => setSelectedSense(e.target.value)}>
                      <option value="" disabled>Select a sense</option>
                      {senses.map((sense) => (
                        <option key={sense._id} value={sense._id}>{sense.title}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="questionInput" className="form-label" style={{color: "black"}}>Question</label>
                  <input type="text" className="form-control" id="questionInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" id="closeQuestionModal" style={{ backgroundColor: "#ffe8b5", color: "#191f45" }} className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">Close</button>
                <button type="button" style={{ backgroundColor: "#ffe8b5", color: "#191f45" }} onClick={handleSubmit} className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
              </div>
            </div>
          </div>
        </div>
        <Box>
          <Box
            mt="40px"
            height="75vh"
            width="80vw"
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
              rows={questions || []}
              columns={columns}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Questions;

import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import "../../index.css";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
  localStorage.removeItem("id")
  const navigate = useNavigate();
  const [filters, setFilters] = useState({Name: "", PhNumber: "", Status: "" });
  const [limit, setLimit] = useState("5");
  const [data, setData] = useState([]);
  const theme = useTheme();

  const columns = [
    {
      field: "photo",
      headerName: "Photo",
      headerAlign: "center",
      flex: 0.4,
      renderCell: (params) => (
        <img
          style={{ width: "50px", height: "50px", borderRadius: "50%", padding: "4px", marginLeft: "20%" }}
          alt="Profile" src={require(`../../../src/uploads/staff/${params.value}`)} />
      ),
    },
    {
      field: "employeeID",
      headerName: "Employee ID",
      flex: 0.3,
      renderCell: (params) => (
        <div>{params.row._id.slice(20, 24)}</div>
      ),
    },
    {
      field: "full name",
      headerName: "Full Name",
      flex: 0.5,
      renderCell: (params) => (
        <div>{params.row.firstName} {params.row.lastName}</div>
      ),
    },
    {
      field: "phNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => (
        <div>{params.row.phNumber}</div>
      ),
    },
    {
      field: "dob",
      headerName: "Age",
      flex: 0.4,
      renderCell: (params) => (
        <div>{calAge(params.row.dob)} years</div>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.4,
    },
    // {
    //   field: "plans",
    //   headerName: "Plans",
    //   flex: 0.5,
    //   renderCell: (params) => {
    //     return (
    //     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
    //       <div>
    //         <label htmlFor="1">OCT&nbsp;</label>
    //         <input type="checkbox" id="1" />
    //       </div>
    //       <div>
    //         <label htmlFor="2">ST&nbsp;</label>
    //         <input type="checkbox" id="2" />
    //       </div>
    //       <div>
    //         <label htmlFor="3">KT&nbsp;</label>
    //         <input type="checkbox" id="3" />
    //       </div>
    //     </div>
    //     )
    //   }
    // },
    {
      field: "status",
      headerName: "status",
      flex: 0.5,
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   headerAlign: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div className="actions" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
    //         <button className='btn'><i className="action-buttons" ><FontAwesomeIcon icon={faEye} /></i></button>
    //         <button className='btn' onClick={() => {Navigate(params.row._id)}}><i className="action-buttons" ><FontAwesomeIcon icon={faBarsProgress} /></i></button>
    //         <button className='btn'><i className="action-buttons" ><FontAwesomeIcon icon={faChartColumn} /></i></button>
    //         <button className='btn'><i className="action-buttons" ><FontAwesomeIcon icon={faDollarSign} /></i></button>
    //         <button className='btn'><i className="action-buttons" ><FontAwesomeIcon icon={farPenToSquare} /></i></button>
    //         <button className='btn'><i className="action-buttons" ><FontAwesomeIcon style={{ color: "red" }} icon={faTrashAlt} /></i></button>
    //       </div>
    //     )
    //   }
    // },
  ];
  const onChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/staff/getStaffs?limit=${limit}`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  const sendData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/child/filterChild?limit=${limit}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  const clearFilter = () => {
    fetchData();
    setFilters({ ID: "", Name: "", Parent: "", Status: "" });
  };

  const onLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const calAge = (i) => {
    const dbDateString = i;
    const dbDate = new Date(dbDateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - dbDate;
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const differenceInYears = differenceInMilliseconds / millisecondsInYear;
    const yearsDifference = Math.floor(differenceInYears);
    return yearsDifference;
  };


  return (
    <div>
      <div className="mx-5 my-4">
        <Header title="Employee Profiles" subtitle={"List of Employees"} />
        <div className="mt-5 mb-4">
          <div className="row" style={{ alignItems: "center" }}>
            
            <div className="col-md-2">
              <label htmlFor="Name" className="form-label">Name</label>
              <input
                style={{backgroundColor:"#21295C",color:"#FFFFFF",border:"none"}}
                id="Name"
                onChange={onChange}
                value={filters.Name}
                className="form-control me-2 input-placeholder"
                aria-label="Search"
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="PhNumber" className="form-label">Phone Number</label>
              <input
                style={{backgroundColor:"#21295C",color:"#FFFFFF",border:"none"}}
                id="PhNumber"
                onChange={onChange}
                value={filters.PhNumber}
                className="form-control me-2 input-placeholder"
                aria-label="Search"
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="Status" className="form-label">Status</label>
              <select style={{backgroundColor:"#21295C",color:"#63698C",border:"none"}} onChange={onChange} value={filters.Status} className="form-select" id="Status">
                <option style={{color:"#63698C"}} value="">Select Status</option>
                <option style={{color:"white"}} value="Active">Active</option>
                <option style={{color:"white"}} value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label" style={{ display: "block" }}>&nbsp;</label>
              <button onClick={sendData} style={{backgroundColor:"#ffe8b5", color:"#191f45",width: "100px"}} className="btn btn-secondary mx-2">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <button onClick={clearFilter} className="btn btn-secondary" style={{ width: "50px", display: "inline-block" ,backgroundColor:"#ffe8b5", color:"#191f45"}}>
                <FontAwesomeIcon icon={faRemove} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <label htmlFor="entries" className="form-label">Entries</label>
            <select style={{backgroundColor:"#21295C",color:"#FFFFFF",border:"none"}} value={limit} onChange={onLimitChange} className="form-select" id="entries">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="All">All</option>
            </select>
          </div>
          <div>
            <label>&nbsp;</label>
            <div>
              <button className="btn btn-dark" style={{backgroundColor:"#ffe8b5", color:"#191f45"}} type="submit" onClick={() => {navigate("/addemployee")}}>
                + Add Employee
              </button>
              <button className="btn btn-secondary mx-4" style={{backgroundColor:"#ffe8b5", color:"#191f45"}}>Export</button>
            </div>
          </div>
        </div>
      </div>
      <Box m="1.5rem 2.5rem">
        <Box
          mt="40px"
          height="75vh"
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
            rows={data || []}
            columns={columns}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Staff;
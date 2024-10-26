import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Box, useTheme } from "@mui/material";
// import "../../index.css";
import { DataGrid } from "@mui/x-data-grid";

const TherapyPlans = () => {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const theme = useTheme();
  // console.log(localStorage.getItem("id"));
  // if (localStorage.getItem("id") === "null") {
  //     navigate("/child")
  // }
  const [age, setAge] = useState("");
  const [child, setChild] = useState({});
  const [plans, setPlans] = useState([]);
  const [entries, setEntries] = useState(5);
  const [plan, setPlan] = useState({
    childId: localStorage.getItem("id"),
    therapy: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const getTherapyPlans = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/therapyplans/getTherapyPlans?limit=${entries}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            childId: localStorage.getItem("id"),
          }),
        }
      );
      const json = await response.json();
      setPlans(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getChild = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/child/childprofile/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setChild(json);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addPlan = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/therapyplans/addTherapyPlan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            childId: plan.childId,
            therapy: plan.therapy,
            startDate: plan.startDate,
            endDate: plan.endDate,
            status: plan.status,
          }),
        }
      );
      const json = await response.json();
      setPlans(plans.concat(json));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const calculateAge = (dob) => {
    // Parse the date of birth
    const birthDate = new Date(dob);

    // Get the current date
    const today = new Date();

    // Calculate years
    let years = today.getFullYear() - birthDate.getFullYear();

    // Calculate months
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate days
    let days = today.getDate() - birthDate.getDate();
    if (days < 0) {
      months--;
      if (months < 0) {
        years--;
        months += 11;
      }
      // Get the number of days in the previous month
      const previousMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
      const daysInPreviousMonth = new Date(
        today.getFullYear(),
        previousMonth + 1,
        0
      ).getDate();
      days += daysInPreviousMonth;
    }
    console.log(`${years} years ${months} months ${days} days`);
    return `${years} years, ${months} months, and ${days} days`;
  };

  const columns = [
    {
      field: "sNo",
      headerName: "S No",
      flex: 0.1,
      renderCell: (params) => <div>{plans.indexOf(params.row) + 1}</div>,
    },
    {
      field: "therapy",
      headerName: "Therapy",
      flex: 0.3,
      renderCell: (params) => <div>{params.row.therapy}</div>,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0.2,
      renderCell: (params) => <div>{params.row.startDate}</div>,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 0.2,
      renderCell: (params) => <div>{params.row.endDate}</div>,
    },
    {
      field: "reports",
      headerName: "Reports",
      flex: 0.5,
      // headerAlign: "center",
      renderCell: () => (
        <div className="d-flex">
          <button type="button" className="btn btn-dark btn-sm mt-2 mx-2">
            Therapy Progress
          </button>
          <button type="button" className="btn btn-dark btn-sm mt-2">
            Education Report
          </button>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.2,
      renderCell: (params) => {
        // (params.row.status === "Active") ? (
        //   <div style={{ color: "green" }}>{params.row.status}</div>
        // ) : (
        //   <div style={{ color: "red" }}>{params.row.status}</div>
        // );
        <div style={{color: params.row.status === "Active"? "green" : "red"}}>{params.row.status}</div>
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
          <button className="btn"><FontAwesomeIcon icon={faEye} /></button>
          <button className="btn"><FontAwesomeIcon icon={faPenToSquare} className="mx-2" /></button>
          <button className="btn"><FontAwesomeIcon icon={faDollarSign} /></button>
          </>
        )
      }
    }
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

  const handleClick = (e) => {
    if (plan.therapy !== "") {
      if (plan.startDate !== "") {
        if (plan.endDate !== "") {
          if (plan.status === "Active" || plan.status === "Inactive") {
            addPlan(
              plan.childId,
              plan.therapy,
              plan.startDate,
              plan.endDate,
              plan.status
            );
            setPlan({ therapy: "", startDate: "", endDate: "", status: "" });
          } else {
            e.preventDefault();
            alert("Please select the status of the therapy");
          }
        } else {
          e.preventDefault();
          alert("Please select the end date of the therapy");
        }
      } else {
        e.preventDefault();
        alert("Please select the start date of the therapy");
      }
    } else {
      e.preventDefault();
      alert("Please enter the therapy name");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate("/child");
    }
    getTherapyPlans();
    getChild();
  }, [entries]);

  useEffect(() => {
    if (child.dob) {
      setAge(calculateAge(child.dob));
    }
  }, [child]);

  return (
    <>
      <div className="mx-5">
        <div className="my-4">
          <Header title="Therapy Plans" subtitle={"Child"} />
        </div>
        <div className="my-4 row g-3">
          <div className="col-md-3">
            <div
              className="card"
              style={{
                width: "18rem",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <div className="card-body" style={{ color: "white" }}>
                <h4 className="card-title">Child Name</h4>
                <p className="card-text">
                  {child.firstName} {child.lastName}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card"
              style={{
                width: "18rem",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <div className="card-body" style={{ color: "white" }}>
                <h4 className="card-title">Parent Name</h4>
                <p className="card-text">
                  {child.parentFirstName} {child.parentLastName}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card"
              style={{
                width: "18rem",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <div className="card-body" style={{ color: "white" }}>
                <h4 className="card-title">Child Age</h4>
                <p className="card-text">{age}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card"
              style={{
                width: "18rem",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <div className="card-body" style={{ color: "white" }}>
                <h4 className="card-title">Gender</h4>
                <p className="card-text">{child.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5">
        <nav className="navbar navbar-expand-lg bg-body-primary">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <div className="nav-link" style={{ color: "white" }}>
                    Top
                  </div>
                </li>
                <li className="nav-item">
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={entries}
                    onChange={(e) => {
                      setEntries(e.target.value);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value="All">All</option>
                  </select>
                </li>
                <li className="nav-item">
                  <div className="nav-link" style={{ color: "white" }}>
                    Entries
                  </div>
                </li>
              </ul>
              <>
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ backgroundColor: "rgb(204,167,82)", color: "white" }}
                >
                  + Add New Plan
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="exampleModalLabel"
                          style={{ color: "black" }}
                        >
                          Add a new therapy plan
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <form
                          className="row g-3 needs-validation"
                          noValidate=""
                        >
                          <div className="col-md-12">
                            <label
                              htmlFor="therapy"
                              className="form-label"
                              style={{ color: "black" }}
                            >
                              Therapy
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="therapy"
                              name="therapy"
                              value={plan.therapy}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="startDate"
                              className="form-label"
                              style={{ color: "black" }}
                            >
                              Start Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="startDate"
                              name="startDate"
                              value={plan.startDate}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="endDate"
                              className="form-label"
                              style={{ color: "black" }}
                            >
                              End Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="endDate"
                              name="endDate"
                              value={plan.endDate}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-12">
                            <label
                              htmlFor="status"
                              className="form-label"
                              style={{ color: "black" }}
                            >
                              Status
                            </label>
                            <select
                              className="form-select"
                              id="status"
                              name="status"
                              value={plan.status}
                              onChange={handleChange}
                            >
                              <option value="">Choose...</option>
                              <option value={"Active"}>Active</option>
                              <option value={"Inactive"}>Inactive</option>
                            </select>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn"
                          onClick={handleClick}
                          style={{ backgroundColor: "rgb(204,167,82)" }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </nav>

        
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
            rows={plans || []}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default TherapyPlans;

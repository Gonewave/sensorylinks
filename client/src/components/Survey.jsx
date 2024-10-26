// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import { Box, useTheme, InputBase } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";

// const Survey = () => {
//   localStorage.removeItem("maxValue");
//   localStorage.removeItem("maxSharedValue");
//   const navigate = useNavigate();
//   const childId = localStorage.getItem("id");
//   const [surveys, setSurveys] = useState([]);
//   const theme = useTheme();
//   const [sharedSurveys, setSharedSurveys] = useState([]);

//   const calculatedMax = Math.max(
//     ...surveys.map((item) => parseInt(item.assessment))
//   );
//   const calcualtedSharedMax = Math.max(
//     ...sharedSurveys.map((item) => parseInt(item.assessment))
//   );
//   const maxAssessmentValue = isFinite(calculatedMax) ? calculatedMax : 0;
//   console.log(maxAssessmentValue);
//   const maxSharedAssessmentValue = isFinite(calcualtedSharedMax) ? calcualtedSharedMax : 0;
//   console.log(maxSharedAssessmentValue);
//   const fetchSurveys = async () => {
//     const response = await fetch("http://localhost:3001/getSurveys", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         childId: childId,
//       }),
//     });
//     const data = await response.json();
//     setSurveys(data);

//   };
//   const fetchSharedSurveys = async () => {
//     const response = await fetch("http://localhost:3001/getSharedSurveys", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         childId: childId,
//       }),
//     });
//     const data = await response.json();
//     setSharedSurveys(data);

//   };
//   const groupedSurveys = surveys.reduce((acc, survey) => {
//     const { assessment } = survey;
//     if (!acc[assessment]) {
//       acc[assessment] = [];
//     }
//     acc[assessment].push(survey);
//     return acc;
//   }, {});
//   const groupedSharedSurveys = sharedSurveys.reduce((acc, survey) => {
//     const { assessment } = survey;
//     if (!acc[assessment]) {
//       acc[assessment] = [];
//     }
//     acc[assessment].push(survey);
//     return acc;
//   }, {});

//   const columns = [
//     {
//       field: "Sense",
//       headerName: "Sense",
//       flex: 0.2,
//       renderCell: (params) => <div>{params.row.sense}</div>,
//     },
//     {
//       field: "Question",
//       headerName: "Question",
//       flex: 0.7,
//       renderCell: (params) => <div>{params.row.question}</div>,
//     },
//     {
//       field: "Reflexs",
//       headerName: "Reflexs",
//       flex: 0.6,
//       renderCell: (params) => <div> {params.row.reflex.join(", ")}</div>,
//     },
//     {
//       field: "Score",
//       headerName: "Score",
//       flex: 0.2,
//       renderCell: (params) => <div>{params.row.score}</div>,
//     },
//   ];

//   useEffect(() => {
//     if (localStorage.getItem("id") === null) {
//       navigate("/child");
//     }
//     fetchSurveys();
//     fetchSharedSurveys();
//   }, []);

//   return (
//     <div className="mx-5 my-5">
//       <>
//         {/* Button trigger modal */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           <button
//             type="button"
//             className="btn"
//             style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
//             onClick={() => {
//               localStorage.setItem("maxValue", maxAssessmentValue);
//               localStorage.setItem("maxSharedValue", maxSharedAssessmentValue);
//               navigate("/assessment", { state: { maxAssessmentValue } });
//             }}
//           >
//             New Assessment
//           </button>
//           <button
//             type="button"
//             className="btn"
//             style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
//             onClick={() => {
//               localStorage.setItem("maxValue", maxAssessmentValue);
//               localStorage.setItem("maxSharedValue", maxSharedAssessmentValue);
//               navigate("/assessment", { state: { maxAssessmentValue, isShare: true } }); // Add `isShare: true`
//             }}
//           >
//             Share Assessment
//           </button>

//           {/* <button
//             type="button"
//             className="btn"
//             style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
//             onClick={() => {
//               navigate("/score");
//             }}
//           >
//             Assign Scores
//           </button> */}
//         </div>
//       </>
//       {surveys.length == 0 && (<div className="my-5">No assessments done</div>)}
//       {Object.keys(groupedSurveys).map((assessment) => (
//         <div className="my-5" key={assessment}>
//           <h2>Therapist Assessment {assessment}</h2>
//           <Box>
//             <Box
//               mt="40px"
//               // height="75vh"
//               sx={{
//                 "& .MuiDataGrid-root": {
//                   border: "none",
//                 },
//                 "& .MuiDataGrid-cell": {
//                   borderBottom: "none",
//                 },
//                 "& .MuiDataGrid-columnHeaders": {
//                   backgroundColor: theme.palette.background.alt,
//                   color: theme.palette.secondary[100],
//                   borderBottom: "none",
//                 },
//                 "& .MuiDataGrid-virtualScroller": {
//                   backgroundColor: theme.palette.primary.light,
//                 },
//                 "& .MuiDataGrid-footerContainer": {
//                   backgroundColor: theme.palette.background.alt,
//                   color: theme.palette.secondary[100],
//                   borderTop: "none",
//                 },
//               }}
//             >
//               <DataGrid
//                 getRowId={(row) => row._id}
//                 rows={groupedSurveys[assessment] || []}
//                 columns={columns}
//               />
//             </Box>
//           </Box>
//         </div>
//       ))}
//       {Object.keys(groupedSharedSurveys).map((assessment) => (
//         <div className="my-5" key={assessment}>
//           <h2>Parent Assessment {assessment}</h2>
//           <Box>
//             <Box
//               mt="40px"
//               // height="75vh"
//               sx={{
//                 "& .MuiDataGrid-root": {
//                   border: "none",
//                 },
//                 "& .MuiDataGrid-cell": {
//                   borderBottom: "none",
//                 },
//                 "& .MuiDataGrid-columnHeaders": {
//                   backgroundColor: theme.palette.background.alt,
//                   color: theme.palette.secondary[100],
//                   borderBottom: "none",
//                 },
//                 "& .MuiDataGrid-virtualScroller": {
//                   backgroundColor: theme.palette.primary.light,
//                 },
//                 "& .MuiDataGrid-footerContainer": {
//                   backgroundColor: theme.palette.background.alt,
//                   color: theme.palette.secondary[100],
//                   borderTop: "none",
//                 },
//               }}
//             >
//               <DataGrid
//                 getRowId={(row) => row._id}
//                 rows={groupedSharedSurveys[assessment] || []}
//                 columns={columns}
//               />
//             </Box>
//           </Box>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Survey;
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Box, useTheme, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const Survey = () => {
  const navigate = useNavigate();
  const childId = localStorage.getItem("id");
  const [surveys, setSurveys] = useState([]);
  const theme = useTheme();
  const [sharedSurveys, setSharedSurveys] = useState([]);

  const calculatedMax = Math.max(
    ...surveys.map((item) => parseInt(item.assessment))
  );
  const calcualtedSharedMax = Math.max(
    ...sharedSurveys.map((item) => parseInt(item.assessment))
  );
  const maxAssessmentValue = isFinite(calculatedMax) ? calculatedMax : 0;
  console.log(maxAssessmentValue);
  const maxSharedAssessmentValue = isFinite(calcualtedSharedMax) ? calcualtedSharedMax : 0;
  console.log(maxSharedAssessmentValue);
  const fetchSurveys = async () => {
    const response = await fetch("http://localhost:3001/getSurveys", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        childId: childId,
      }),
    });
    const data = await response.json();
    setSurveys(data);
    const maxAssessmentValue = isFinite(calculatedMax) ? calculatedMax : 0;
    localStorage.setItem("maxValue", maxAssessmentValue);

  };
  const fetchSharedSurveys = async () => {
    const response = await fetch("http://localhost:3001/getSharedSurveys", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        childId: childId,
      }),
    });
    const data = await response.json();
    setSharedSurveys(data);
    const maxSharedAssessmentValue = isFinite(calcualtedSharedMax) ? calcualtedSharedMax : 0;
    localStorage.setItem("maxSharedValue", maxSharedAssessmentValue);

  };
  const groupedSurveys = surveys.reduce((acc, survey) => {
    const { assessment } = survey;
    if (!acc[assessment]) {
      acc[assessment] = [];
    }
    acc[assessment].push(survey);
    return acc;
  }, {});
  const groupedSharedSurveys = sharedSurveys.reduce((acc, survey) => {
    const { assessment } = survey;
    if (!acc[assessment]) {
      acc[assessment] = [];
    }
    acc[assessment].push(survey);
    return acc;
  }, {});

  const columns = [
    {
      field: "Sense",
      headerName: "Sense",
      flex: 0.2,
      renderCell: (params) => <div>{params.row.sense}</div>,
    },
    {
      field: "Question",
      headerName: "Question",
      flex: 0.7,
      renderCell: (params) => <div>{params.row.question}</div>,
    },
    {
      field: "Reflexs",
      headerName: "Reflexs",
      flex: 0.6,
      renderCell: (params) => <div> {params.row.reflex.join(", ")}</div>,
    },
    {
      field: "Score",
      headerName: "Score",
      flex: 0.2,
      renderCell: (params) => <div>{params.row.score}</div>,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate("/child");
    }
    fetchSurveys();
    fetchSharedSurveys();
  }, []);

  return (
    <div className="mx-5 my-5">
      <>
        {/* Button trigger modal */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
            onClick={() => {
              localStorage.setItem("maxValue", maxAssessmentValue);
              localStorage.setItem("maxSharedValue", maxSharedAssessmentValue);
              navigate("/assessment", { state: { maxAssessmentValue } });
            }}
          >
            New Assessment
          </button>
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
            onClick={() => {
              localStorage.setItem("maxValue", maxAssessmentValue);
              localStorage.setItem("maxSharedValue", maxSharedAssessmentValue);
              navigate("/assessment", { state: { maxSharedAssessmentValue, isShare: true } }); // Add isShare: true
            }}

          >
            Share Assessment
          </button>

          {/* <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
            onClick={() => {
              navigate("/score");
            }}
          >
            Assign Scores
          </button> */}
        </div>
      </>
      {surveys.length == 0 && (<div className="my-5">No assessments done</div>)}
      {Object.keys(groupedSurveys).map((assessment) => (
        <div className="my-5" key={assessment}>
          <h2>Therapist Assessment {assessment}</h2>
          <Box>
            <Box
              mt="40px"
              // height="75vh"
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
              }}
            >
              <DataGrid
                getRowId={(row) => row._id}
                rows={groupedSurveys[assessment] || []}
                columns={columns}
              />
            </Box>
          </Box>
        </div>
      ))}
      {Object.keys(groupedSharedSurveys).map((assessment) => (
        <div className="my-5" key={assessment}>
          <h2>Parent Assessment {assessment}</h2>
          <Box>
            <Box
              mt="40px"
              // height="75vh"
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
              }}
            >
              <DataGrid
                getRowId={(row) => row._id}
                rows={groupedSharedSurveys[assessment] || []}
                columns={columns}
              />
            </Box>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default Survey;
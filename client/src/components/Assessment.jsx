// import React, { useEffect, useState } from "react";
// import Select from 'react-select';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import Header from "components/Header";
// import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

// const Assessment = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // Use this to access passed state
//   const childId = localStorage.getItem("id");
//   const maxValue=localStorage.getItem("maxValue");
//   const maxSharedValue=localStorage.getItem("maxSharedValue");
  
//   // Access the 'isShare' flag from location state
//   const isShare = location.state?.isShare || false;

//   const [senses, setSenses] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [surveys, setSurveys] = useState([]);
//   const [input, setInput] = useState({
//     childId: childId,
//     sense: "",
//     question: "",
//     reflex: [],
//     score: "",
//     assessment:isShare? parseInt(localStorage.getItem("maxSharedValue")) + 1:parseInt(localStorage.getItem("maxValue")) + 1
//   });
//   const [options, setOptions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const changeOptions = (selectedOption) => {
//     setSelectedOptions(selectedOption);
//     const selectedLabels = selectedOption.map(option => option.label);
//     setInput(prevInput => ({
//       ...prevInput,
//       reflex: selectedLabels
//     }));
//   };

//   const onChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const getReflexs = async () => {
//     const response = await fetch('http://localhost:3001/getReflex', {
//       method: "GET",
//       headers: {"Content-Type": "application/json"}
//     });
//     const data = await response.json();
//     setOptions(data.map(item => ({ label: item.title, value: item.title })));
//   };

//   const handleOnChange = (e, idx) => {
//     const updatedSurveys = surveys.map((survey, index) =>
//       index === idx ? { ...survey, score: e.target.value } : survey
//     );
//     setSurveys(updatedSurveys);
//   };

//   const fetchSense = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/getSense");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setSenses(data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3001/getSpecificQuestion",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ sense: input.sense }),
//         }
//       );
//       const data = await response.json();
//       setQuestions(data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const AddSurvey = async () => {
//     const newSurvey = {
//       childId: childId,
//       sense: input.sense,
//       question: input.question,
//       reflex: input.reflex,
//       score: isShare ? undefined : input.score, // No score in 'share' mode
//       assessment: isShare? parseInt(localStorage.getItem("maxSharedValue")) + 1:parseInt(localStorage.getItem("maxValue")) + 1
//     };
    
//     setSurveys(surveys.concat(newSurvey));
//     setInput({ sense: "", question: "", reflex: [], score: "" });
//   };

//   // Submit survey for new assessment mode
//   const handleSubmit = async () => {
//     await fetch("http://localhost:3001/addSurveyCollection", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ surveys: surveys })
//     });
//     navigate("/survey");
//   };

//   // Share functionality for share mode (You can define the logic later)
//   const handleShare = async () => {
//     // Check if there are no questions in the survey
//     if (surveys.length === 0) {
//       // Show a warning asking for confirmation
//       if (!window.confirm("No questions have been added. Do you still want to share the assessment without any questions?")) {
//         return; // If user cancels, stop the execution
//       }
//     }
  
//     try {
//       // Send the survey data to the backend for sharing
//       const response = await fetch("http://localhost:3001/shareAssessment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           childId,
//           survey: surveys, // Send the survey data
//         }),
//       });
  
//       const data = await response.json();
      
//       if (data.success) {
//         // If successful, display the share URL
//         alert(`Assessment shared successfully! Share this link: http://localhost:3000${data.shareUrl}`);
//         navigator.clipboard.writeText(`http://localhost:3000${data.shareUrl}`)
//         navigate("/survey"); // Redirect back to the survey page
//       } else {
//         alert("Failed to share the assessment.");
//       }
//     } catch (error) {
//       console.log("Error sharing assessment:", error);
//       alert("An error occurred while sharing the assessment.");
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("id") === null) {
//       navigate("/child");
//     }
//     fetchSense();
//     getReflexs();
//   }, []);

//   useEffect(() => {
//     fetchQuestions();
//   }, [input]);

//   return (
//     <div>
//       <div className="mx-5 my-5">
//         <Header title={isShare?`Parent Assessment ${parseInt(maxSharedValue)+1}`:`Therapist Assessment ${parseInt(maxValue)+1}`} subtitle={isShare ? "Share Assessment" : "New Assessment"} />
//       </div>
//       <div className="mx-5 my-5">
//         <button
//           type="button"
//           className="btn"
//           data-bs-toggle="modal"
//           data-bs-target="#exampleModal"
//           style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
//         >
//           + Add Question
//         </button>

//         {/* Modal */}
//         <div
//           className="modal fade my-3"
//           id="exampleModal"
//           tabIndex={-1}
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//           style={{ color: "black" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                   Add Survey
//                 </h1>
//               </div>
//               <div className="modal-body">
//                 <form className="row g-3 needs-validation" noValidate="">
//                   <div className="col-md-12">
//                     <label htmlFor="sense" className="form-label">
//                       Sense
//                     </label>
//                     <select
//                       className="form-select"
//                       id="sense"
//                       name="sense"
//                       required=""
//                       onChange={onChange}
//                     >
//                       <option value={""}>Choose...</option>
//                       {senses.map((sense) => (
//                         <option key={sense._id} value={sense.title}>
//                           {sense.title}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="col-md-12">
//                     <label htmlFor="question" className="form-label">
//                       Question
//                     </label>
//                     <select
//                       className="form-select"
//                       id="question"
//                       name="question"
//                       required=""
//                       onChange={onChange}
//                     >
//                       <option value={""}>Choose...</option>
//                       {questions.map((question) => (
//                         <option key={question._id} value={question.question}>
//                           {question.question}
//                         </option>
//                       ))}
//                     </select>
//                     <label htmlFor="reflex" className="form-label">
//                       Reflex
//                     </label>
//                     <Select
//                       options={options}
//                       value={selectedOptions}
//                       onChange={changeOptions}
//                       isMulti={true}
//                     />
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={AddSurvey}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <br />

//         {surveys.map((survey, index) => (
//           <div key={index}>
//             <div
//               className="my-2"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <div className="container-fluid my-2" style={{ padding: "7px" }}>
//                 <div>
//                   <h4>Sense: {survey.sense}</h4>
//                   <h5>Question: {survey.question}</h5>
//                   <h5>Reflex: {survey.reflex.join(", ")}</h5>
//                 </div>
//               </div>
//               {!isShare && (
//                 <div>
//                   <div className="input-group mb-3" style={{ padding: "7px" }}>
//                     <span className="input-group-text">Score</span>
//                     <input
//                       type="number"
//                       className="form-control"
//                       onChange={(e) => handleOnChange(e, index)}
//                       name="score"
//                       value={survey.score}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//             <hr />
//           </div>
//         ))}
//         {
//           isShare && (
//             <button
//             type="button"
//             className="btn btn-success"
//             style={{ backgroundColor: "#191f45", color: "#ffe8b5" }}
//             onClick={isShare ? handleShare : handleSubmit}
//           >
//             {isShare ? "Share" : "Submit"}
//           </button>
//           )
//         }
//         {surveys.length > 0 && !isShare && (
//           <button
//             type="button"
//             className="btn btn-success"
//             style={{ backgroundColor: "#191f45", color: "#ffe8b5" }}
//             onClick={isShare ? handleShare : handleSubmit}
//           >
//             {"Submit"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Assessment;
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "components/Header";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const Assessment = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use this to access passed state
  const childId = localStorage.getItem("id");
  const maxValue = localStorage.getItem("maxValue");
  const maxSharedValue = localStorage.getItem("maxSharedValue");

  // Access the 'isShare' flag from location state
  const isShare = location.state?.isShare || false;

  const [templates, setTemplates] = useState([]);
  const [choosenTemplate, setChoosenTemplate] = useState("");
  const [surveys, setSurveys] = useState([]);

  const handleOnChange = (e, idx) => {
    const updatedSurveys = surveys.map((survey, index) =>
      index === idx ? { ...survey, score: e.target.value } : survey
    );
    setSurveys(updatedSurveys);
  };
  
  // Submit survey for new assessment mode
  const handleSubmit = async () => {
    await fetch("http://localhost:3001/addSurveyCollection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ surveys: surveys }),
    });
    navigate("/survey");
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/templates/fetchTemplates",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      } else {
        console.error("Failed to fetch templates", response.status);
      }
    } catch (error) {
      console.error("Error fetching templates", error);
    }
  };

  // Share functionality for share mode (You can define the logic later)
  const handleShare = async () => {
    // Check if there are no questions in the survey
    if (surveys.length === 0) {
      // Show a warning asking for confirmation
      if (
        !window.confirm(
          "No questions have been added. Do you still want to share the assessment without any questions?"
        )
      ) {
        return; // If user cancels, stop the execution
      }
    }

    try {
      // Send the survey data to the backend for sharing
      const response = await fetch("http://localhost:3001/shareAssessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          survey: surveys, // Send the survey data
        }),
      });

      const data = await response.json();

      if (data.success) {
        // If successful, display the share URL
        alert(
          `Assessment shared successfully! Share this link: http://localhost:3000${data.shareUrl}`
        );
        navigator.clipboard.writeText(`http://localhost:3000${data.shareUrl}`);
        navigate("/survey"); // Redirect back to the survey page
      } else {
        alert("Failed to share the assessment.");
      }
    } catch (error) {
      console.log("Error sharing assessment:", error);
      alert("An error occurred while sharing the assessment.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate("/child");
    }
    fetchTemplates();
  }, []);

  return (
    <div>
      <div className="mx-5 my-5">
        <Header
          title={
            isShare
              ?`Parent Assessment ${parseInt(maxSharedValue) + 1}`
              : `Therapist Assessment ${parseInt(maxValue) + 1}`
          }
          subtitle={isShare ? "Share Assessment" : "New Assessment"}
        />
      </div>
      <div className="mx-5 my-5">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            const selectedTemplateId = e.target.value;
            setChoosenTemplate(selectedTemplateId);

            // Find the selected template
            const selectedTemplate = templates.find(
              (template) => template._id === selectedTemplateId
            );

            if (selectedTemplate) {
              // Add score field to each survey
              const updatedSurveys = selectedTemplate.surveys.map((survey) => ({
                ...survey,
                score: "",
                childId: childId,
                assessment: isShare
                  ? parseInt(localStorage.getItem("maxSharedValue")) + 1
                  : parseInt(localStorage.getItem("maxValue")) + 1,
              }));

              // Set surveys with the score field
              setSurveys(updatedSurveys);
            } else {
              setSurveys([]); // Set to an empty array if no template is found
            }
          }}
        >
          <option value={""}>Select a template</option>
          {templates.map((template) => (
            <option key={template._id} value={template._id}>
              {template.name}
            </option>
          ))}
        </select>

        {surveys.map((survey, index) => (
          <div key={index}>
            <div
              className="my-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="container-fluid my-2" style={{ padding: "7px" }}>
                <div>
                  <h4>Sense: {survey.sense}</h4>
                  <h5>Question: {survey.question}</h5>
                  <h5>Reflex: {survey.reflex.join(", ")}</h5>
                </div>
              </div>
              {!isShare && (
                <div>
                  <div className="input-group mb-3" style={{ padding: "7px" }}>
                    <span className="input-group-text">Score</span>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => handleOnChange(e, index)}
                      name="score"
                      value={survey.score}
                    />
                  </div>
                </div>
              )}
            </div>
            <hr />
          </div>
        ))}
        {isShare && (
          <button
            type="button"
            className="btn my-3"
            style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
            onClick={isShare ? handleShare : handleSubmit}
          >
            {isShare ? "Share" : "Submit"}
          </button>
        )}
        {surveys.length > 0 && !isShare && (
          <button
            type="button"
            className="btn btn-success"
            style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
            onClick={isShare ? handleShare : handleSubmit}
          >
            {"Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment;
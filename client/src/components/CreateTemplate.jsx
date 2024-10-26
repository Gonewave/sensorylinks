import React, { useEffect, useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "components/Header";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const CreateTemplate = () => {
    const navigate = useNavigate();
  const [senses, setSenses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [input, setInput] = useState({
    sense: "",
    question: "",
    reflex: [],
  });
  const [template, setTemplate] = useState({ name: "", surveys: [] });
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeTemplate = (e) => {
    setTemplate({ ...template, [e.target.name]: e.target.value });
  };

  const changeOptions = (selectedOption) => {
    setSelectedOptions(selectedOption);
    const selectedLabels = selectedOption.map((option) => option.label);
    setInput((prevInput) => ({
      ...prevInput,
      reflex: selectedLabels,
    }));
  };

  const handleDelete = (indexToDelete) => {
    // Filter out the survey based on the index
    // setSurveys(surveys.filter((_, index) => index !== indexToDelete));
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      surveys: prevTemplate.surveys.filter((_, index) => index !== indexToDelete),
    }));
  };

  const getReflexs = async () => {
    const response = await fetch("http://localhost:3001/getReflex", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setOptions(data.map((item) => ({ label: item.title, value: item.title })));
  };

  const fetchSense = async () => {
    try {
      const response = await fetch("http://localhost:3001/getSense");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSenses(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/getSpecificQuestion",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sense: input.sense }),
        }
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const AddSurvey = async () => {
    const newSurvey = {
      sense: input.sense,
      question: input.question,
      reflex: input.reflex,
    };

    // setSurveys(surveys.concat(newSurvey));
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      surveys: prevTemplate.surveys.concat(newSurvey), 
    }));
    setInput({ sense: "", question: "", reflex: [] });
    setSelectedOptions([]);
  };

  const handleCreate = async () => {
    const response = await fetch("http://localhost:3001/templates/createTemplate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: template.name,
        surveys: template.surveys
      })
    })
    console.log(response);
    navigate("/templates");
  }

  useEffect(() => {
    fetchSense();
    getReflexs();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [input]);

  return (
    <div>
      <div className="mx-5 my-5">
        <Header title={"Assessment Templates"} subtitle={"Create Template"} />
      </div>
      <div className="mx-5 my-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Template Name
          </label>
          <input
            type="email"
            className="form-control"
            id="name"
            name="name"
            value={template.name}
            onChange={changeTemplate}
          />
        </div>
        <button
          type="button"
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
        >
          + Add Question
        </button>

        {/* Modal */}
        <div
          className="modal fade my-3"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ color: "black" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add Survey
                </h1>
              </div>
              <div className="modal-body">
                <form className="row g-3 needs-validation" noValidate="">
                  <div className="col-md-12">
                    <label htmlFor="sense" className="form-label">
                      Sense
                    </label>
                    <select
                      className="form-select"
                      id="sense"
                      name="sense"
                      required=""
                      onChange={onChange}
                    >
                      <option value={""}>Choose...</option>
                      {senses.map((sense) => (
                        <option key={sense._id} value={sense.title}>
                          {sense.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="question" className="form-label">
                      Question
                    </label>
                    <select
                      className="form-select"
                      id="question"
                      name="question"
                      required=""
                      onChange={onChange}
                    >
                      <option value={""}>Choose...</option>
                      {questions.map((question) => (
                        <option key={question._id} value={question.question}>
                          {question.question}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="reflex" className="form-label">
                      Reflex
                    </label>
                    <Select
                      options={options}
                      value={selectedOptions}
                      onChange={changeOptions}
                      isMulti={true}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={AddSurvey}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {template.surveys.map((survey, index) => (
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
              <div>
                <button
                  className="btn"
                  style={{ padding: "7px" }}
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <FontAwesomeIcon
                    style={{ height: "30px", color: "#ffffff" }}
                    icon={faTrashCan}
                  />
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}

        {template.surveys.length > 0 && (
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
            onClick={handleCreate}
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;
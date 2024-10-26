import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, useEffect } from "react";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";

const Score = () => {
  const navigate = useNavigate();
  const childId = localStorage.getItem("id");
  const [surveys, setSurveys] = useState([]);

  const handleOnChange = (e, id) => {
    const updatedSurveys = surveys.map((survey) =>
      survey._id === id ? { ...survey, score: e.target.value } : survey
    );
    setSurveys(updatedSurveys);
  };

  const fetchSurveys = async () => {
    const response = await fetch("http://localhost:3001/getSurveys", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childId: childId }),
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      setSurveys(data);
    } else {
      console.error("Expected an array, but got:", data);
    }
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3001/updateScore", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newSurvey: surveys })
    });
    const data = await response.json();
    if (Array.isArray(data)) {
        setSurveys(data);
      } else {
        console.error("Expected an array, but got:", data);
      }
    navigate("/assessment");
  }

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate("/child");
    }
    fetchSurveys();
  }, [navigate]);

  return (
    <>
      <div className="mx-5 my-5">
        <Header title="Survey" subtitle="Assign Scores" />
      </div>
      <div className="mx-5 my-5">
        {surveys.map((survey) => (
          <div key={survey._id}>
            <div
              className="my-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="container-fluid my-2" style={{ padding: "7px" }}>
                <div>
                  <h4>Sense: {survey.sense}</h4>
                  <h5>Question: {survey.question}</h5>
                </div>
              </div>
              <div>
                <div className="input-group mb-3" style={{ padding: "7px" }}>
                  <span className="input-group-text" id="basic-addon1">
                    Score
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    value={survey.score}
                    name="score"
                    placeholder="Assign score"
                    onChange={(e) => handleOnChange(e, survey._id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn"
          style={{ backgroundColor: "#ffe8b5", color: "#191f45" }}
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default Score;

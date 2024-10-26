import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Select from 'react-select';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { jwtDecode } from 'jwt-decode';
import Header from "components/Header";

const ShareAssessment = () => {
    const maxSharedValue=localStorage.getItem("maxSharedValue");
    const childId = localStorage.getItem("id");
    const navigate = useNavigate();
    const { token } = useParams(); // Extract token from URL params
    const [senses, setSenses] = useState([]);
    const [input, setInput] = useState({
        childId: childId,
        sense: "",
        question: "",
        reflex: [],
        score: "",
        assessment: parseInt(localStorage.getItem("maxValue")) + 1,
    });


    const [isAccessGranted, setIsAccessGranted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSpecificQuestion, setIsSpecificQuestion] = useState(false);
    const [surveys, setSurveys] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Check token validity and access control
    useEffect(() => {
        const validateToken = async () => {
            try {
                // Decode the token to get the payload
                const decodedToken = jwtDecode(token);

                // Check if the token's childId matches the local storage id
                if (decodedToken.childId !== childId) {
                    alert("Access Denied: Token childId doesn't match!");
                    navigate("/survey");
                    return;
                }

                // Fetch the token data from the backend
                const response = await fetch(`http://localhost:3001/assessment/${token}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Failed to fetch assessment data");
                }

                // Grant access if token is valid
                setIsAccessGranted(true);
                setIsSubmitted(data.isSubmitted);
                setIsSpecificQuestion(data.specificQuestions);
                setSurveys(data.survey); // Load the survey questions

            } catch (error) {
                console.error("Token validation failed", error);
                alert("Access Denied: Invalid token!");
                navigate("/survey");
            }
        };

        validateToken();
    }, [token, childId, navigate]);


    // Handle form submit
    // const handleSubmit = async () => {
    // try {
    //     await fetch(`http://localhost:3001/submitAssessment/${token}`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             surveys: surveys
    //         }),
    //     });
    //     alert("Assessment submitted successfully");
    //     setIsSubmitted(true); // Update the submission status
    // } catch (error) {
    //     console.error("Submission failed", error);
    //     alert("Failed to submit the assessment");
    // }
    // };
    const changeOptions = (selectedOption) => {
        setSelectedOptions(selectedOption);
        const selectedLabels = selectedOption.map(option => option.label);
        setInput(prevInput => ({
            ...prevInput,
            reflex: selectedLabels
        }));
    };

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const getReflexs = async () => {
        const response = await fetch('http://localhost:3001/getReflex', {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setOptions(data.map(item => ({ label: item.title, value: item.title })));
    };

    const handleOnChange = (e, idx) => {
        const updatedSurveys = surveys.map((survey, index) =>
            index === idx ? { ...survey, score: e.target.value } : survey
        );
        setSurveys(updatedSurveys);
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
            childId: childId,
            sense: input.sense,
            question: input.question,
            reflex: input.reflex,
            score: input.score, // No score in 'share' mode
            assessment: parseInt(localStorage.getItem("maxValue")) + 1,
        };

        setSurveys(surveys.concat(newSurvey));
        setInput({ sense: "", question: "", reflex: [], score: "" });
    };
    const handleSubmit = async () => {

        try {
            await fetch("http://localhost:3001/addSharedSurveyCollection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ surveys: surveys })
            });
            await fetch(`http://localhost:3001/submitAssessment/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    surveys: surveys
                }),
            });
            alert("Assessment submitted successfully");
            setIsSubmitted(true); // Update the submission status
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit the assessment");
        }
        navigate("/child");
    };
    const handleBack = () => {
        navigate("/child");
    }
    useEffect(() => {
        if (localStorage.getItem("id") === null) {
            navigate("/child");
        }
        fetchSense();
        getReflexs();
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, [input]);
    return (
        <div>
            {!isAccessGranted ? (
                <h2>Validating Access...</h2>
            ) : isSubmitted ? (
                <>
                    <h2>Assessment Already Submitted</h2>
                    <button type="button"
                        className="btn btn-success"
                        style={{ backgroundColor: "#191f45", color: "#ffe8b5" }} onClick={handleBack}>
                        Back
                    </button>
                </>
            ) : (
                <>
                    <div className="mx-5 my-5">
                        <Header title={`Parent Assessment `} subtitle={"New Assessment"} />
                    </div>
                    <div className="mx-5 my-5">

                        {
                            surveys.map((survey, index) => (
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

                                    </div>
                                    <hr />
                                </div>
                            ))
                        }
                        {surveys.length > 0 && (
                            <button
                                type="button"
                                className="btn btn-success"
                                style={{ backgroundColor: "#191f45", color: "#ffe8b5" }}
                                onClick={handleSubmit}
                            >
                                {"Submit"}
                            </button>
                        )}
                    </div>

                </>
                
            )}
        </div>
    );
};

export default ShareAssessment;

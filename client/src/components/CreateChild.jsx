import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "components/Header";
import mongoose from 'mongoose';

const CreateChild = () => {
  const navigate = useNavigate();
  const today = new Date().toDateString().slice(4);
  const [diff, setDiff] = useState([]);
  const [goals, setGoals] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [modalname, setModalname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diff_response = await fetch("http://localhost:3001/difficulties");
        const diff = await diff_response.json();
        const goal_response = await fetch(
          "http://localhost:3001/goals"
        );
        const goals = await goal_response.json();
        const need_response = await fetch(
          "http://localhost:3001/needs"
        );
        const needs = await need_response.json();
        setDiff(diff.map((item) => item.title));
        setGoals(goals.map((item) => item.title));
        setNeeds(needs.map((item) => item.title));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    admissionDate: "",
    admissionFee: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    documentFileName: [],
    status: "",
    parentFirstName: "",
    parentLastName: "",
    contactNumber: "",
    emailID: "",
    address: "",
    currentMedication: "",
    foodHabits: "",
    medicalHistory: "",
    familyHistory: "",
    additionalInfo: "",
    specialNeed: [],
    difficulties: [],
    goals: [],
    tempFileName: "",
    tempFile: null,
    therapies:[]
  });
  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState([]);

  const [add, setAdd] = useState({ etitle: "", edescription: "" });

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setAdd({ ...add, [id]: value });
  };

  const handleClick = async (name) => {
    console.log(name.modalname);
    if (add.etitle.trim() !== "" && add.edescription.trim() !== "") {
      if (name.modalname === "Special Needs") {
        await fetch("http://localhost:3001/createNeeds", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: add.etitle,
            description: add.edescription,
          }),
        });
        setNeeds(needs.concat(add.etitle));
      } else if (name.modalname === "Difficulties") {
        await fetch("http://localhost:3001/createDifficulties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: add.etitle,
            description: add.edescription,
          }),
        });
        setDiff(diff.concat(add.etitle));
      } else {
        await fetch("http://localhost:3001/createGoals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: add.etitle,
            description: add.edescription,
          }),
        });
        setGoals(goals.concat(add.etitle));
      }
      setAdd({ etitle: "", edescription: "" });
    }
  };

  const onChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setInput({ ...input, [id]: value });
  };
  const onPhotoChange = (e) => {
    if (e.target.files[0].name) {
      setPhoto(e.target.files[0]);
    } else {
      setPhoto("");
    }
  };
  const onDocumentChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setInput({...input, ["tempFile"]: event.target.files[0]});
      // event.target.value = "";
    }
  };
  const addDocuments = (e) => {
    setInput({...input, ["documentFileName"]: input.documentFileName.push(input.tempFileName)})
    setDocuments([...documents, input.tempFile])
    setInput({...input, ["tempFile"]: null, ["tempFileName"]: ""})
    const a = document.getElementById("document");
    a.value = "";
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  const sendData = async (e) => {
    if (input.admissionDate !== "") {
      if (input.admissionFee.trim() !== "") {
        if (input.firstName.trim() !== "") {
          if (input.lastName.trim() !== "") {
            if (
              input.gender === "Male" ||
              input.gender === "Female" ||
              input.gender === "Others"
            ) {
              if (input.dob !== "") {
                if (input.height.trim() !== "") {
                  if (input.weight.trim() !== "") {
                    if (
                      input.status === "Active" ||
                      input.status === "Inactive"
                    ) {
                      if (input.address.trim().length >= 10) {
                        if (input.parentFirstName.trim() !== "") {
                          if (input.parentLastName.trim() !== "") {
                            const regex_phnumber = new RegExp("^[0-9]{10}$");
                            if (regex_phnumber.test(input.contactNumber)) {
                              const regex_email =
                                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
                              if (regex_email.test(input.emailID)) {
                                if (input.specialNeed.length !== 0) {
                                  if (input.difficulties.length !== 0) {
                                    if (input.goals.length !== 0) {
                                      if (
                                        input.currentMedication.trim().length >
                                        0
                                      ) {
                                        if (
                                          input.foodHabits.trim().length > 0
                                        ) {
                                          if (
                                            input.familyHistory.trim().length >
                                            0
                                          ) {
                                            if (
                                              input.medicalHistory.trim()
                                                .length > 0
                                            ) {
                                              if (
                                                input.additionalInfo.trim()
                                                  .length > 0
                                              ) {
                                                try {
                                                  setLoading(true);
                                                  const formData =  new FormData();
                                                  // const fakeTherapyId =new mongoose.Types.ObjectId().toString(); // Convert to string

                                                  // Append the fake ObjectId for therapies
                                                  formData.append("therapies", JSON.stringify([])); // Convert to string for JSON serialization
                                                  // Append other documents
                                                  documents.forEach((doc) => {
                                                    formData.append('documents', doc);
                                                  });
                                                  formData.append("documents", photo);
                                              
                                                  // formData.append(
                                                  //   "documentFilePath",
                                                  //   documentFilePath
                                                  // );
                                                  Object.entries(input).forEach(
                                                    ([key, value]) => {
                                                      if (
                                                        key === "specialNeed" ||
                                                        key ===
                                                          "difficulties" ||
                                                        key === "goals" || key === "documentFileName"
                                                      ) {
                                                        value.forEach(
                                                          (goal) => {
                                                            formData.append(
                                                              key,
                                                              goal
                                                            );
                                                          }
                                                        );
                                                      } else {
                                                        formData.append(
                                                          key,
                                                          value
                                                        );
                                                      }
                                                    }
                                                  );

                                                  formData.forEach((i)=>{
                                                    console.log(i);
                                                  })
                                                  // formData.append("therapies",[])
                                                  const response = await fetch(
                                                    "http://localhost:3001/child/createChild",
                                                    {
                                                      method: "POST",
                                                      body: formData,
                                                    }
                                                  );
                                                  const result =
                                                    await response.json();
                                                  setLoading(false);
                                                  console.log(result);
                                                  setInput({
                                                    admissionDate: "",
                                                    admissionFee: "",
                                                    firstName: "",
                                                    lastName: "",
                                                    gender: "",
                                                    dob: "",
                                                    height: "",
                                                    weight: "",
                                                    documentFileName: [],
                                                    status: "",
                                                    parentFirstName: "",
                                                    parentLastName: "",
                                                    contactNumber: "",
                                                    emailID: "",
                                                    address: "",
                                                    currentMedication: "",
                                                    foodHabits: "",
                                                    medicalHistory: "",
                                                    familyHistory: "",
                                                    additionalInfo: "",
                                                    specialNeed: [],
                                                    difficulties: [],
                                                    goals: [],
                                                    therapies:[]
                                                  });
                                                  window.location.reload();
                                                  navigate("/child");
                                                } catch (error) {
                                                  console.error(
                                                    "Error sending data:",
                                                    error
                                                  );
                                                } finally {
                                                  setLoading(false);
                                                }
                                              } else {
                                                e.preventDefault();
                                                alert(
                                                  "Please enter the additional information"
                                                );
                                              }
                                            } else {
                                              e.preventDefault();
                                              alert(
                                                "Please enter the medical history"
                                              );
                                            }
                                          } else {
                                            e.preventDefault();
                                            alert(
                                              "Please enter the family history"
                                            );
                                          }
                                        } else {
                                          e.preventDefault();
                                          alert("Please enter the food habits");
                                        }
                                      } else {
                                        e.preventDefault();
                                        alert(
                                          "Please enter the current medication"
                                        );
                                      }
                                    } else {
                                      e.preventDefault();
                                      alert("Please select atleast one goal");
                                    }
                                  } else {
                                    e.preventDefault();
                                    alert(
                                      "Please select atleast one difficulty"
                                    );
                                  }
                                } else {
                                  e.preventDefault();
                                  alert(
                                    "Please select atleast one special need"
                                  );
                                }
                              } else {
                                e.preventDefault();
                                alert("Please enter a valid email id");
                              }
                            } else {
                              e.preventDefault();
                              alert("Please enter a vaid contact number");
                            }
                          } else {
                            e.preventDefault();
                            alert("Please enter the parent's last name");
                          }
                        } else {
                          e.preventDefault();
                          alert("Please enter the parent's first name");
                        }
                      } else {
                        e.preventDefault();
                        alert("Please enter address of atleast 10 characters");
                      }
                    } else {
                      e.preventDefault();
                      alert("Please select the correct status");
                    }
                  } else {
                    e.preventDefault();
                    alert("Please enter the weight of child in kg's");
                  }
                } else {
                  e.preventDefault();
                  alert("Please enter the height of child in cm's");
                }
              } else {
                e.preventDefault();
                alert("Please select the correct date of birth");
              }
            } else {
              e.preventDefault();
              alert("Please select the child's gender");
            }
          } else {
            e.preventDefault();
            alert("Please enter child's last name");
          }
        } else {
          e.preventDefault();
          alert("Please enter child's first name");
        }
      } else {
        e.preventDefault();
        alert("Please enter the admission fee");
      }
    } else {
      e.preventDefault();
      alert("Please enter the admission date");
    }
  };

  const handleCheckboxes = (e, x) => {
    const { value, checked } = e.target;

    setInput((prevState) => {
      const updatedx = checked
        ? [...(prevState[x] || []), value]
        : (prevState[x] || []).filter((item) => item !== value);

      return {
        ...prevState,
        [x]: updatedx,
      };
    });
  };

  return (
    <>
    <div className="my-4 mx-5">
    <Header title="Add a New Child" subtitle={"Child"}/>
    </div>
      <div className="mx-5">
        <div className="my-4" style={{ fontSize: "40px" }}>
          Admission Information
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="admissionDate" className="form-label">
              Admission Date
            </label>
            <input
              className="form-control"
              type="date"
              onChange={onChange}
              value={input.admissionDate}
              id="admissionDate"
              aria-label="default input example"
              max={formatDate(today)}
            ></input>
          </div>
          <div className="col-md-6">
            <label htmlFor="admissionFee" className="form-label">
              Admission Fee
            </label>
            <input
              className="form-control"
              type="number"
              id="admissionFee"
              onChange={onChange}
              value={input.admissionFee}
              aria-label="default input example"
            ></input>
          </div>
        </div>
        <div className="my-4" style={{ fontSize: "40px" }}>
          Personal Details
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              className="form-control"
              type="text"
              onChange={onChange}
              value={input.firstName}
              id="firstName"
              aria-label="default input example"
            ></input>
          </div>
          <div className="col-md-4">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              className="form-control"
              type="text"
              onChange={onChange}
              value={input.lastName}
              id="lastName"
              aria-label="default input example"
            ></input>
          </div>
          <div className="col-md-4">
            <label htmlFor="gender" className="form-label">
              Gender{" "}
            </label>
            <input
              className="form-control"
              onChange={onChange}
              value={input.gender}
              list="genderoptions"
              id="gender"
            />
            <datalist id="genderoptions">
              <option value="Male" />
              <option value="Female" />
              <option value="Others" />
            </datalist>
          </div>
          <div className="col-md-4">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              className="form-control"
              type="date"
              onChange={onChange}
              value={input.dob}
              id="dob"
              aria-label="default input example"
              max={formatDate(today)}
            ></input>
          </div>
          <div className="col-md-4">
            <label htmlFor="height" className="form-label">
              Height
            </label>
            <input
              className="form-control"
              type="number"
              onChange={onChange}
              value={input.height}
              id="height"
              aria-label="default input example"
            ></input>
          </div>
          <div className="col-md-4">
            <label htmlFor="weight" className="form-label">
              Weight
            </label>
            <input
              className="form-control"
              type="number"
              onChange={onChange}
              value={input.weight}
              id="weight"
              aria-label="default input example"
            ></input>
          </div>
          <div className="col-md-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input
              className="form-control"
              onChange={onChange}
              value={input.status}
              list="statusoptions"
              id="status"
            />
            <datalist id="statusoptions">
              <option value="Active" />
              <option value="Inactive" />
            </datalist>
          </div>

          <div className="col-md-6">
            <label htmlFor="photo" className="form-label">
              Photo
            </label>
            <input
              className="form-control"
              onChange={onPhotoChange}
              type="file"
              id="photo"
            ></input>
          </div>

          <div className="col-md-12">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              className="form-control"
              onChange={onChange}
              value={input.address}
              id="address"
              aria-label="default input example"
            ></input>
          </div>
        </div>

        <div className="my-4" style={{ fontSize: "40px" }}>
          Parent Details
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="parentFirstName" className="form-label">
              Parent First Name
            </label>
            <input
              className="form-control"
              type="text"
              onChange={onChange}
              value={input.parentFirstName}
              id="parentFirstName"
              aria-label="default input example"
            ></input>
          </div>
          <div className="col-md-6">
            <label htmlFor="parentLastName" className="form-label">
              Parent Last Name
            </label>
            <input
              className="form-control"
              type="text"
              onChange={onChange}
              value={input.parentLastName}
              id="parentLastName"
              aria-label="default input example"
            ></input>
          </div>

          <div className="col-md-6">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              className="form-control"
              onChange={onChange}
              value={input.contactNumber}
              id="contactNumber"
              aria-label="default input example"
            ></input>
          </div>
          <div className="col-md-6">
            <label htmlFor="emailID" className="form-label">
              EmailID
            </label>
            <input
              className="form-control"
              onChange={onChange}
              value={input.emailID}
              id="emailID"
              aria-label="default input example"
            ></input>
          </div>
        </div>

        <div className="my-4" style={{ fontSize: "40px" }}>
          Documents
        </div>
        <div className="">
          <div className="d-flex" style={{flexDirection: "row"}}>
          <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#documentModal" style={{"backgroundColor": "rgb(204,167,82)"}}>
            + Add
          </button>
          {input && input.documentFileName.map((file) => {
            return <p className="mx-1" key={file}>{file} </p>
          })}
          </div>
          <div
            className="modal fade"
            id="documentModal"
            tabIndex={-1}
            aria-labelledby="documentModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="documentModalLabel" style={{color: "black"}}>
                    Upload Document
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {setInput({...input, ["tempFileName"]: ""})}}
                  ></button>
                </div>
                <div className="modal-body">
                <label htmlFor="tempFileName" className="form-label" style={{color: "black"}}>File name</label>
                  <input className="form-control" type="text" onChange={onChange} value={input.tempFileName} id="tempFileName" aria-label="default input example"></input>
                  <label htmlFor="document" className="form-label" style={{color: "black"}}>Upload file</label>
                  <input className="form-control" type="file" onChange={onDocumentChange} id="document" aria-label="default input example"></input>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-bs-dismiss="modal"
                    onClick={addDocuments}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>

        <div className="my-4" style={{ fontSize: "40px" }}>
          Goals and Needs
        </div>
        <div className="my-4">
          <span >Special Needs</span>
          <br></br>
          <div className="row g-3">
            {needs.map((item, index) => (
              <div className="col-md-4" key={item}>
                <ul className="list-group">
                  <li className="list-group-item" style={{ border: "none" }}>
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      onChange={(e) => handleCheckboxes(e, "specialNeed")} // Pass the goal as the value
                      value={item} // Set the value of the checkbox to the goal title
                      id={`g${item}`} // Use a unique id for each checkbox
                    />
                    <label className="form-check-label" htmlFor={`g${item}`}>
                      {item}
                    </label>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <>
            {/* Button trigger modal */}
            <button
              type="button"
              className="btn my-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              id="Special Needs"
              onClick={() => {
                setModalname("Special Needs");
              }}
              style={{"backgroundColor": "rgb(204,167,82)"}}
            >
              + Add New
            </button>
            {/* Modal */}
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
                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color: "black"}}>
                      Add {modalname}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="etitle"
                          value={add.etitle}
                          onChange={handleChange}
                        />
                        <label htmlFor="etitle" style={{color: "black"}}>Title</label>
                      </div>
                      <div className="form-floating">
                        <textarea
                          type="text"
                          className="form-control"
                          id="edescription"
                          value={add.edescription}
                          onChange={handleChange}
                        />
                        <label htmlFor="edescription" style={{color: "black"}}>Description</label>
                      </div>
                    </>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        handleClick({ modalname });
                      }}
                      style={{"backgroundColor": "rgb(204,167,82)"}}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
        <div className=" my-4">
          <span>Difficulties</span>
          <br></br>
          <div className="row g-3">
            {diff.map((item, index) => (
              <div className="col-md-4" key={item}>
                <ul className="list-group">
                  <li className="list-group-item" style={{ border: "none"}}>
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      onChange={(e) => handleCheckboxes(e, "difficulties")} // Pass the goal as the value
                      value={item} // Set the value of the checkbox to the goal title
                      id={`g${item}`} // Use a unique id for each checkbox
                    />
                    <label className="form-check-label" htmlFor={`g${item}`}>
                      {item}
                    </label>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn my-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            id="Difficulties"
            onClick={() => {
              setModalname("Difficulties");
            }}
            style={{"backgroundColor": "rgb(204,167,82)"}}
          >
            + Add New
          </button>
        </div>
        <div className=" my-4">
          <span>Goals</span>
          <br></br>
          <div className="row g-3">
            {goals.map((item, index) => (
              <div className="col-md-4" key={item}>
                <ul className="list-group">
                  <li className="list-group-item" style={{ border: "none" }}>
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      onChange={(e) => handleCheckboxes(e, "goals")} // Pass the goal as the value
                      value={item} // Set the value of the checkbox to the goal title
                      id={`g${item}`} // Use a unique id for each checkbox
                    />
                    <label className="form-check-label" htmlFor={`g${item}`}>
                      {item}
                    </label>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn my-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            id="Goals"
            onClick={() => {
              setModalname("Goals");
            }}
            style={{"backgroundColor": "rgb(204,167,82)"}}
          >
            + Add New
          </button>
        </div>

        <div className="my-4" style={{ fontSize: "40px" }}>
          Health Information
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="currentMedication" className="form-label">
            Current Medication
          </label>
          <textarea
            className="form-control"
            rows={7}
            onChange={onChange}
            value={input.currentMedication}
            id="currentMedication"
            aria-label="default input example"
          ></textarea>
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="foodHabits" className="form-label">
            Food Habits
          </label>
          <textarea
            className="form-control"
            rows={7}
            onChange={onChange}
            value={input.foodHabits}
            id="foodHabits"
            aria-label="default input example"
          ></textarea>
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="familyHistory" className="form-label">
            {" "}
            Family History
          </label>
          <textarea
            className="form-control"
            rows={7}
            onChange={onChange}
            value={input.familyHistory}
            id="familyHistory"
            aria-label="default input example"
          ></textarea>
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="medicalHistory" className="form-label">
            Medical History
          </label>
          <textarea
            className="form-control"
            rows={7}
            onChange={onChange}
            value={input.medicalHistory}
            id="medicalHistory"
            aria-label="default input example"
          ></textarea>
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="additionalInfo" className="form-label">
            Additional Information
          </label>
          <textarea
            className="form-control"
            rows={7}
            onChange={onChange}
            value={input.additionalInfo}
            id="additionalInfo"
            aria-label="default input example"
          ></textarea>
        </div>

        <button className="btn" onClick={sendData} disabled={loading} style={{"backgroundColor": "rgb(204,167,82)"}}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        <br />
        <br />

        {loading && <div className="loader"></div>}
      </div>
    </>
  );
};

export default CreateChild;

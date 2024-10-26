import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState, useEffect } from "react";
import Header from "components/Header";
// import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStaff = () => {
  const navigate = useNavigate();
  const today = new Date().toDateString().slice(4);
  const [designations, setDesignations] = useState([]);
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    phNumber: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    address: "",
    photo: "",
    status: "",
    designation: "",
    qualification: "",
    degreeCertificate: "",
    practicingApprovalCertificate: "",
    aadharNumber: "",
    aadharCard: "",
    panNumber: "",
    panCard: "",
    bankAccountNumber: "",
    bankIFCCode: "",
    bankMICRCode: "",
    bankName: "",
    bankBranch: "",
    tempFileName: "",
    tempFile: null,
  });
  const [imageFile, setimageFile] = useState(null);
  const [aadharFile, setaadharFile] = useState(null);
  const [panFile, setpanFile] = useState(null);
  const [degreeFile, setdegreeFile] = useState(null);
  const [practicingFile, setpracticingFile] = useState(null);
  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setimageFile(e.target.files[0]);
  };
  const handleAadharChange = (e) => {
    setaadharFile(e.target.files[0]);
  };
  const handlePanChange = (e) => {
    setpanFile(e.target.files[0]);
  };
  const handleDegreeChange = (e) => {
    setdegreeFile(e.target.files[0]);
  };
  const handlePracticingChange = (e) => {
    setpracticingFile(e.target.files[0]);
  };

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post(
      "http://localhost:3001/staff/uploadfile",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (type === "photo") {
      setStaff({ ...staff, photo: result.data });
      alert("Photo uploaded successfully");
    } else if (type === "aadharCard") {
      setStaff({ ...staff, aadharCard: result.data });
      alert("Aadhar card uploaded successfully");
    } else if (type === "panCard") {
      setStaff({ ...staff, panCard: result.data });
      alert("Pan card uploaded successfully");
    } else if (type === "degreeCertificate") {
      setStaff({ ...staff, degreeCertificate: result.data });
      alert("Degree certificate uploaded successfully");
    } else if (type === "practicingApprovalCertificate") {
      setStaff({ ...staff, practicingApprovalCertificate: result.data });
      alert("Practicing approval certificate uploaded successfully");
    }
  };

  const fetchDesignations = async () => {
    const response = await fetch(
      "http://localhost:3001/designation/getDesignations",
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const json = await response.json();
    setDesignations(json);
  };

  const addingStaff = async (
    firstName,
    lastName,
    phNumber,
    dob,
    gender,
    email,
    password,
    address,
    photo,
    status,
    designation,
    qualification,
    degreeCertificate,
    practicingApprovalCertificate,
    aadharNumber,
    aadharCard,
    panNumber,
    panCard,
    bankAccountNumber,
    bankIFCCode,
    bankMICRCode,
    bankName,
    bankBranch
  ) => {
    const response = await fetch(`http://localhost:3001/staff/createStaff`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phNumber: phNumber,
        dob: dob,
        gender: gender,
        email: email,
        password: password,
        address: address,
        photo: photo,
        status: status,
        designation: designation,
        qualification: qualification,
        degreeCertificate: degreeCertificate,
        practicingApprovalCertificate: practicingApprovalCertificate,
        aadharNumber: aadharNumber,
        aadharCard: aadharCard,
        panNumber: panNumber,
        panCard: panCard,
        bankAccountNumber: bankAccountNumber,
        bankIFCCode: bankIFCCode,
        bankMICRCode: bankMICRCode,
        bankName: bankName,
        bankBranch: bankBranch,
      }),
    });

    const json = await response.json();
    return json;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  const handleClick = async (e) => {
    if (staff.firstName.trim().length > 0) {
      if (staff.lastName.trim().length > 0) {
        if (staff.phNumber.trim().length > 0) {
          var regex_phnumber = new RegExp("^[0-9]{10}$");
          if (regex_phnumber.test(staff.phNumber)) {
            if (staff.email.trim().length > 0) {
              const regex_email =
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
              if (regex_email.test(staff.email)) {
                if (staff.password.trim().length >= 6) {
                  if (staff.status.trim().length > 0) {
                    if (staff.address.trim().length > 10) {
                      if (staff.photo !== "") {
                        if (RegExp("^[0-9]{12}$").test(staff.aadharNumber)) {
                          if (staff.aadharCard !== "") {
                            if (RegExp("^[0-9]{10}$").test(staff.panNumber)) {
                              if (staff.panCard !== "") {
                                if (staff.designation.length > 0) {
                                  if (staff.qualification.trim().length > 0) {
                                    if (staff.degreeCertificate !== "") {
                                      if (staff.practicingApprovalCertificate !=="") {
                                        if (staff.bankAccountNumber.trim().length > 0) {
                                          if (staff.bankIFCCode.trim().length > 0) {
                                            if (staff.bankMICRCode.trim().length > 0) {
                                              if (staff.bankName.trim().length > 0) {
                                                if (staff.bankBranch.trim().length > 0) {
                                                  e.preventDefault();
                                                  addingStaff(staff.firstName,staff.lastName,staff.phNumber,staff.dob,staff.gender,staff.email,staff.password,staff.address,staff.photo,staff.status,staff.designation,staff.qualification,staff.degreeCertificate,staff.practicingApprovalCertificate,staff.aadharNumber,staff.aadharCard,staff.panNumber,staff.panCard,staff.bankAccountNumber,staff.bankIFCCode,staff.bankMICRCode,staff.bankName,staff.bankBranch
                                                  );
                                                  navigate("/employee");
                                                  // console.log(response.id)
                                                  // console.log(http://localhost:3000/addStaff/${response.id})
                                                } else {
                                                  e.preventDefault();
                                                  alert("Please enter the bank branch");
                                                }
                                              } else {
                                                e.preventDefault();
                                                alert("Please enter the bank name");
                                              }
                                            } else {
                                              e.preventDefault();
                                              alert("Please enter the bank MICR code");
                                            }
                                          } else {
                                            e.preventDefault();
                                            alert("Please enter the bank IFC code");
                                          }
                                        } else {
                                          e.preventDefault();
                                          alert("Please enter the bank account number of the employee");
                                        }
                                      } else {
                                        e.preventDefault();
                                        alert("Please upload the practicing approval certificate of the employee");
                                      }
                                    } else {
                                      e.preventDefault();
                                      alert("Please upload the degree certificate of the employee");
                                    }
                                  } else {
                                    e.preventDefault();
                                    alert("Please enter the qualification of the employee");
                                  }
                                } else {
                                  e.preventDefault();
                                  alert("Select the designation");
                                }
                              } else {
                                e.preventDefault();
                                alert("Please upload pan card of the employee");
                              }
                            } else {
                              e.preventDefault();
                              alert("Please enter a valid pan number");
                            }
                          } else {
                            e.preventDefault();
                            alert("Please upload aadhar card of the employee");
                          }
                        } else {
                          e.preventDefault();
                          alert("Please enter a valid aadhar number");
                        }
                      } else {
                        e.preventDefault();
                        alert("Please upload photo of the employee");
                      }
                    } else {
                      e.preventDefault();
                      alert("Enter address of atleast 10 characters");
                    }
                  } else {
                    e.preventDefault();
                    alert("Enter the status of the employee");
                  }
                } else {
                  e.preventDefault();
                  alert("Enter a password of atleast 6 characters");
                }
              } else {
                e.preventDefault();
                alert("Enter a valid email address");
              }
            } else {
              e.preventDefault();
              alert("Enter the email address");
            }
          } else {
            e.preventDefault();
            alert("Enter a valid phone number");
          }
        } else {
          e.preventDefault();
          alert("Enter the phone number");
        }
      } else {
        e.preventDefault();
        alert("Enter the last name");
      }
    } else {
      e.preventDefault();
      alert("Enter the first name");
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);
  return (
    <>
      <div className="my-4 mx-5">
      <Header title="Add a New Employee" subtitle={"Employee"}/>
      </div>
      <div className="my-4 mx-5">
        <form className="row g-3">
          <div className="" style={{ fontSize: "40px" }}>
            Personal Details
          </div>
          <div className="col-md-4">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={staff.firstName}
            />
          </div>

          <div className="col-4">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={staff.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="phNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phNumber"
              name="phNumber"
              value={staff.phNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-4">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={staff.dob}
              onChange={handleChange}
              max={formatDate(today)}
            />
          </div>

          <div className="col-4">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              id="gender"
              name="gender"
              value={staff.gender}
              onChange={handleChange}
            />
          </div>

          <div className="col-4">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={staff.status}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={staff.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={staff.password}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={staff.address}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="photo" className="form-label">
              Photo
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
              <input
                type="button"
                value={"Upload"}
                className="input-group-text"
                htmlFor="photo"
                onClick={() => {
                  if (imageFile !== null) {
                    handleUpload(imageFile, "photo");
                  } else {
                    alert("Please select a photo to upload");
                  }
                }}
              />
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="aadharNumber" className="form-label">
              Aadhar Number
            </label>
            <input
              type="text"
              className="form-control"
              id="aadharNumber"
              name="aadharNumber"
              onChange={handleChange}
              value={staff.aadharNumber}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="aadharCard" className="form-label">
              Aadhar Card
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                accept="application/pdf"
                className="form-control"
                id="aadharCard"
                name="aadharCard"
                onChange={handleAadharChange}
              />
              <input
                type="button"
                value={"Upload"}
                className="input-group-text"
                htmlFor="photo"
                onClick={() => {
                  if (aadharFile !== null) {
                    handleUpload(aadharFile, "aadharCard");
                  } else {
                    alert("Please select aadhar card to upload");
                  }
                }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="panNumber" className="form-label">
              Pan Number
            </label>
            <input
              type="text"
              className="form-control"
              id="panNumber"
              name="panNumber"
              onChange={handleChange}
              value={staff.panNumber}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="panCard" className="form-label">
              Pan Card
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                accept="application/pdf"
                className="form-control"
                id="panCard"
                name="panCard"
                onChange={handlePanChange}
              />
              <input
                type="button"
                value={"Upload"}
                className="input-group-text"
                htmlFor="panCard"
                onClick={() => {
                  if (panFile !== null) {
                    handleUpload(panFile, "panCard");
                  } else {
                    alert("Please select pan card to upload");
                  }
                }}
              />
            </div>
          </div>

          <div className="col-8">
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <select
              className="form-select"
              value={staff.designation}
              id="designation"
              name="designation"
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option defaultValue="">-- Select the designation --</option>
              {designations.map((designation) => {
                return (
                  <option value={designation.title} key={designation._id}>
                    {designation.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mt-5" style={{ fontSize: "40px" }}>
            Educational Details
          </div>

          <div className="col-md-6">
            <label htmlFor="qualification" className="form-label">
              Qualification
            </label>
            <input
              type="text"
              className="form-control"
              id="qualification"
              name="qualification"
              onChange={handleChange}
              value={staff.qualification}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="degreeCertificate" className="form-label">
              Degree Certificate
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                accept="application/pdf"
                className="form-control"
                id="degreeCertificate"
                name="degreeCertificate"
                onChange={handleDegreeChange}
              />
              <input
                type="button"
                value={"Upload"}
                className="input-group-text"
                htmlFor="degreeCertificate"
                onClick={() => {
                  if (degreeFile !== null) {
                    handleUpload(degreeFile, "degreeCertificate");
                  } else {
                    alert("Please select degree certificate to upload");
                  }
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label
              htmlFor="practicingApprovalCertificate"
              className="form-label"
            >
              Practicing Approval Certificate
            </label>
            <div className="input-group mb-3">
              <input
                type="file"
                accept="application/pdf"
                className="form-control"
                id="practicingApprovalCertificate"
                name="practicingApprovalCertificate"
                onChange={handlePracticingChange}
              />
              <input
                type="button"
                value={"Upload"}
                className="input-group-text"
                htmlFor="practicingApprovalCertificate"
                onClick={() => {
                  if (practicingFile !== null) {
                    handleUpload(
                      practicingFile,
                      "practicingApprovalCertificate"
                    );
                  } else {
                    alert(
                      "Please select a practicing approval certificate to upload"
                    );
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-5" style={{ fontSize: "40px" }}>
            Bank Account Details
          </div>
          <div className="col-md-6">
            <label htmlFor="bankAccountNumber" className="form-label">
              Bank Account Number
            </label>
            <input
              type="text"
              className="form-control"
              id="bankAccountNumber"
              name="bankAccountNumber"
              onChange={handleChange}
              value={staff.bankAccountNumber}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="bankIFCCode" className="form-label">
              Bank IFC Code
            </label>
            <input
              type="text"
              className="form-control"
              id="bankIFCCode"
              name="bankIFCCode"
              onChange={handleChange}
              value={staff.bankIFCCode}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="bankMICRCode" className="form-label">
              Bank MICR Code
            </label>
            <input
              type="text"
              className="form-control"
              id="bankMICRCode"
              name="bankMICRCode"
              onChange={handleChange}
              value={staff.bankMICRCode}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="bankName" className="form-label">
              Bank Name
            </label>
            <input
              type="text"
              className="form-control"
              id="bankName"
              name="bankName"
              onChange={handleChange}
              value={staff.bankName}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="bankBranch" className="form-label">
              Bank Branch
            </label>
            <input
              type="text"
              className="form-control"
              id="bankBranch"
              name="bankBranch"
              onChange={handleChange}
              value={staff.bankBranch}
            />
          </div>

          <div className="col-md-12 my-5">
            <button
              type="submit"
              className="btn"
              onClick={handleClick}
              style={{"backgroundColor": "rgb(204,167,82)"}}
              // style={{"color": "white", "backgroundColor": "rgba(255,255,255,0.2)", "border": "0.5px solid rgb(25,31,69)"}}
            >
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStaff;


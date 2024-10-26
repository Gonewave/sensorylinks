import React from "react";
import Select from 'react-select';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";
import Header from "components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const Email = () => {
    const [emailList, setEmailList] = useState([]);
    const [options, setOptions] = useState([]);
    // const options = [
    //     {value: "mvssriharsha9@gmail.com", label: "Maddila V S Sriharsha"},
    //     {value: "animichandan@gmail.com", label: "Chandan Animi"}
    // ]
  const [selectedOptions, setSelectedOptions] = useState([]);
  const changeOptions = (selectedOption) => {
    setSelectedOptions(selectedOption);
    console.log(selectedOption);
    
  }

  const [body, setBody] = useState({
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/emails/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailList: emailList,
        subject: body.subject,
        message: body.message
      })
    });
    setBody({subject: "", message: ""});
    setEmailList([]);
    setSelectedOptions([]);
  };

  const getEmails = async () => {
    const response = await fetch("http://localhost:3001/child/getids", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });
    const json = await response.json();
    setOptions(json);
  }

  useEffect(() => {
    const emails = selectedOptions.map(email => email.value)
    setEmailList(emails);
  }, [selectedOptions]);

  useEffect(() => {
    getEmails();
  }, []);
  return (
    <>
      <div className="my-4 mx-5">
        <Header title="Email Section" subtitle={"Send an email"} />
      </div>

      <div className="my-4 mx-5">
        <form>
            
          <div className="form-floating my-2">
            <input
              className="form-control"
              placeholder="Leave a comment here"
              id="subject"
              name="subject"
              style={{ height: "50px" }}
              value={body.subject}
              onChange={handleChange}
            ></input>
            <label htmlFor="subject" style={{ color: "black" }}>
              Subject
            </label>
          </div>
          <div className="form-floating my-2">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="message"
              name="message"
              style={{ height: "100px" }}
              onChange={handleChange}
              value={body.message}
            ></textarea>
            <label htmlFor="message" style={{ color: "black" }}>
              Message
            </label>
          </div>
          <div className="mb-5" style={{color: "black", backgroundColor: "blue"}}>
        <Select options={options} value={selectedOptions} onChange={changeOptions} isMulti={true}/>
            </div>
          <button
            type="submit"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={sendEmail}
            style={{"backgroundColor": "rgb(204,167,82)"}}
          >
            Send
          </button>
        </form>

        {/* Button trigger modal */}

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ color: "black" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Email Sent Successfully
                </h1>
              </div>
              <div
                className="modal-body"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="6x"
                  style={{ color: "#34bc43" }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;

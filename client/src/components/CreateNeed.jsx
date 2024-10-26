import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateNeeds() {
    const [need_name, setNeedName] = useState('');
    const [disorder, setDisorder] = useState('');
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createNeeds", { need_name, disorder })
            .then(result => {
                console.log(result);
                navigate('/special_needs');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 ">
            <div className='w-50 p-3'>
                <form onSubmit={Submit}>
                    <h2>Add Special Needs</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="Name"
                                placeholder="Enter name"
                                className="form-control"
                                style={{ backgroundColor: "#21295C",color:'white', border: "none" }}
                                onChange={(e) => setNeedName(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="col-md-6">
                            <label htmlFor="Disorder" className="form-label">Disorder</label>
                            <input
                                type="text"
                                id="Disorder"
                                placeholder="Enter disorder"
                                className="form-control"
                                style={{ backgroundColor: "#21295C",color: "white", border: "none" }}
                                onChange={(e) => setDisorder(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn btn-dark mt-3" style={{ backgroundColor: "#ffe8b5", color: "#191f45" }} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateNeeds;

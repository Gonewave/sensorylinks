import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUsers() {
    const [therapy_name, setTherapyName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createUser", { therapy_name, description })
            .then(result => {
                console.log(result);
                navigate('/therapies');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 ">
            <div className='w-50  p-3'>
                <form onSubmit={Submit}>
                    <h2>Add Therapy</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="therapy-name" className="form-label">Name</label>
                            <input
                                id="therapy-name"
                                type="text"
                                placeholder="Enter name"
                                className="form-control"
                                style={{ backgroundColor: "#21295C",color:"white", border: "none" }}
                                onChange={(e) => setTherapyName(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="col-md-6">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                id="description"
                                type="text"
                                placeholder="Enter description"
                                className="form-control"
                                style={{ backgroundColor: "#21295C",color:"white",  border: "none" }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" style={{ backgroundColor: "#ffe8b5", color: "#191f45" }} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateUsers;

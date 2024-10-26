import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateGoals() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createGoals", { title, description })
            .then(result => {
                console.log(result);
                navigate('/goals');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 ">
            <div className='w-50  p-3'>
                <form onSubmit={Submit}>
                    <h2>Add Goals</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="Name"
                                placeholder="Enter name"
                                className="form-control"
                                style={{ color: "#FFFFFF", border: "none" }}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="Description" className="form-label">Description</label>
                            <input
                                type="text"
                                id="Description"
                                placeholder="Enter description"
                                className="form-control"
                                style={{  color: "#FFFFFF", border: "none" }}
                                onChange={(e) => setDescription(e.target.value)}
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

export default CreateGoals;

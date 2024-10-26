import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateGoals() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getGoals/${id}`)
            .then(result => {
                console.log(result);
                setTitle(result.data.title);
                setDescription(result.data.description);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/updateGoals/${id}`, { title, description })
            .then(result => {
                console.log(result);
                navigate('/goals');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 ">
            <div className='w-50  p-3'>
                <form onSubmit={Update}>
                    <h2>Update Goals</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor=''>Name</label>
                            <input
                                type='text'
                                placeholder='Enter name'
                                className="form-control"
                                style={{ backgroundColor: "#21295C", color: "#FFFFFF", border: "none" }}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div><br/>
                        <div className="col-md-6">
                            <label htmlFor=''>Description</label>
                            <input
                                type='text'
                                placeholder='Enter description'
                                className="form-control"
                                style={{ backgroundColor: "#21295C", color: "#FFFFFF", border: "none" }}
                                value={description}
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

export default UpdateGoals;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateNeeds() {
    const { id } = useParams();
    const [need_name, setNeedName] = useState('');
    const [disorder, setDisorder] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getNeeds/${id}`)
            .then(result => {
                console.log(result);
                setNeedName(result.data.need_name);
                setDisorder(result.data.disorder);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/updateNeeds/${id}`, { need_name, disorder })
            .then(result => {
                console.log(result);
                navigate('/special_needs');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 ">
            <div className='w-50  p-3'>
                <form onSubmit={Update}>
                    <h2>Update Needs</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor=''>Name</label>
                            <input
                                type='text'
                                placeholder='Enter name'
                                className="form-control"
                                style={{ backgroundColor: "#21295C", color: "#FFFFFF", border: "none" }}
                                value={need_name}
                                onChange={(e) => setNeedName(e.target.value)}
                            />
                        </div><br/>
                        <div className="col-md-6">
                            <label htmlFor=''>Description</label>
                            <input
                                type='text'
                                placeholder='Enter description'
                                className="form-control"
                                style={{ backgroundColor: "#21295C", color: "#FFFFFF", border: "none" }}
                                value={disorder}
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

export default UpdateNeeds;

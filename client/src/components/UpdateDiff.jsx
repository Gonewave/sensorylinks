import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateDiffs() {
    const { id } = useParams();
    const [dtitle, setDtitle] = useState('');
    const [ddescription, setDdescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getDifficulties/${id}`)
            .then(result => {
                console.log(result);
                setDtitle(result.data.dtitle);
                setDdescription(result.data.ddescription);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/updateDifficulties/${id}`, { dtitle, ddescription })
            .then(result => {
                console.log(result);
                navigate('/difficulties');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 ">
            <div className='w-50 p-3'>
                <form onSubmit={Update}>
                    <h2>Update Difficulty</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor=''>Name</label>
                            <input
                                type='text'
                                placeholder='Enter name'
                                className="form-control"
                                style={{ backgroundColor: "#21295C", color: "#FFFFFF", border: "none" }}
                                value={dtitle}
                                onChange={(e) => setDtitle(e.target.value)}
                            />
                        </div><br/>
                        <div className="col-md-6">
                            <label htmlFor=''>Disorder</label>
                            <input
                                type='text'
                                placeholder='Enter description'
                                className="form-control"
                                style={{ backgroundColor: "#21295C", color: "#FFFFFF", border: "none" }}
                                value={ddescription}
                                onChange={(e) => setDdescription(e.target.value)}
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

export default UpdateDiffs;
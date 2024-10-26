import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateDiffs() {
    const [dtitle, setDtitle] = useState('');
    const [ddescription, setDdescription] = useState('');
    const navigate = useNavigate();
    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createDifficulties", { dtitle, ddescription })
            .then(result => {
                console.log(result);
                navigate('/difficulties');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 ">
            <div className='w-50  p-3'>
                <form onSubmit={Submit}>
                    <h2 style={{ marginBottom: '20px' }}>Add Difficulty</h2>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="Name"  style={{  }}>Name</label>
                            <input
                                type="text"
                                id="Name"
                                placeholder="Enter name"
                                className="form-control"
                                style={{  color: "#191f45", border: "none" }}
                                onChange={(e) => setDtitle(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="Description"  style={{  }}>Disorder</label>
                            <input
                                type="text"
                                id="Description"
                                placeholder="Enter description"
                                className="form-control"
                                style={{  color: "#191f45", border: "none" }}
                                onChange={(e) => setDdescription(e.target.value)}
                            />
                        </div>
                        </div>  
                    <button className="btn btn-dark" style={{ backgroundColor: "#ffe8b5", color: "#191f45" }} type="submit">
                        Submit
                    </button>
                        </form>  
            </div> 
        </div>
    );
}

export default CreateDiffs;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AssignTherapy() {
    const [children, setChildren] = useState([]);
    const [therapies, setTherapies] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [selectedTherapies, setSelectedTherapies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/therapies/children')
            .then((res) => setChildren(res.data))
            .catch((error) => console.error("Error fetching children:", error));

        axios.get('http://localhost:3001/therapies/therapies')
            .then((res) => setTherapies(res.data))
            .catch((error) => console.error("Error fetching therapies:", error));
    }, []);

    const handleChildSelect = async (selectedOption) => {
        if (!selectedOption) return;

        try {
            const child = await axios.get(`http://localhost:3001/therapies/children/${selectedOption.value}`);
            setSelectedChild(child.data);
            setSelectedTherapies(child.data.therapies.map(t => t._id));
        } catch (error) {
            console.error("Error fetching child data:", error);
        }
    };

    const handleTherapyToggle = (therapyId) => {
        setSelectedTherapies(prev =>
            prev.includes(therapyId)
                ? prev.filter(id => id !== therapyId)
                : [...prev, therapyId]
        );
    };

    const handleSubmit = () => {
        if (!selectedChild) return;

        axios.put(`http://localhost:3001/therapies/assign-therapy/${selectedChild._id}`, {
            therapyIds: selectedTherapies
        }).then((res) => {
            alert("Therapies updated successfully");
            handleChildSelect({ value: selectedChild._id });
        }).catch(error => {
            console.error("Error updating therapies:", error);
        });
    };
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'rgb(204,167,82)' : state.isFocused ? 'rgb(204,167,82)' : 'white',
            color: state.isSelected || state.isFocused ? 'white' : 'black',
        }),
        control: (provided) => ({
            ...provided,
            borderColor: 'rgb(204,167,82)',
        }),
    };


    return (
        <>
        <div className="mx-4 my-4">
        <h2>Assign Therapy</h2>
        <div className="col-12 my-4">
                    <label htmlFor="childSelect" className="form-label">Select Child:</label>
                    <Select
                        id="childSelect" 
                        style={customStyles}
                        options={children.map(child => ({
                            value: child._id,
                            label: `${child.firstName} ${child.lastName}`
                        }))}
                        onChange={handleChildSelect}
                        placeholder="Search and select a child"
                    />
                </div>
                {selectedChild && (
                <>
                    <div className="row mb-3">
                        <div className="col-12">
                            <h5>Assign Therapies</h5>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            {therapies.map(therapy => (
                                <div key={therapy._id} className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`therapy-${therapy._id}`}
                                        checked={selectedTherapies.includes(therapy._id)}
                                        onChange={() => handleTherapyToggle(therapy._id)}
                                    />
                                    <label className="form-check-label"  htmlFor={`therapy-${therapy._id}`}>
                                        {therapy.therapy_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 text-center">
                            <button 
                                className="btn btn-primary mt-3" 
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
        </>
    );    
}

export default AssignTherapy;

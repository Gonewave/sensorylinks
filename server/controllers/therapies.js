import Child from '../models/Child.js';
import Therapy from '../models/Therapies.js';

export const getChild = async (req, res) => {
    try {
        const children = await Child.find().populate('therapies');
        res.json(children);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const therapies = async (req, res) => {
    try {
        const therapies = await Therapy.find();
        res.json(therapies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Endpoint to get all available therapies
export const putTherapy = async (req, res) => {
    const { childId } = req.params;
    const { therapyIds } = req.body;
    try {
        const updatedChild = await Child.findByIdAndUpdate(
            childId,
            { therapies: therapyIds },
            { new: true }
        ).populate('therapies');
        res.json(updatedChild);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getSpecificChild =async (req, res) => {
    try {
        const child = await Child.findById(req.params.id).populate('therapies');
        res.json(child);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Endpoint to get a specific child with therapies

// Endpoint to assign therapies to a specific child

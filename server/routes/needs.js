import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Needs from '../models/Needs.js';

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Get all needs
router.get('/needs', (req, res) => {
    Needs.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Create a new need
router.post('/createNeeds', (req, res) => {
    Needs.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get a need by id
router.get('/getNeeds/:id', (req, res) => {
    const id = req.params.id;
    Needs.findById(id)
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update a need by id
router.post('/updateNeeds/:id', (req, res) => {
    const id = req.params.id;
    const { need_name, disorder } = req.body;

    console.log(`Updating need with ID: ${id}`);
    console.log(`New data: ${JSON.stringify(req.body)}`);

    Needs.findByIdAndUpdate(id, { need_name, disorder }, { new: true })
        .then(users => {
            console.log(`Update result: ${JSON.stringify(users)}`);
            res.json(users);
        })
        .catch(err => {
            console.error(`Update error: ${err.message}`);
            res.status(500).json({ error: err.message });
        });
});

// Delete a need by id
router.delete('/deleteNeeds/:id', (req, res) => {
    const id = req.params.id;
    Needs.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

export default router;

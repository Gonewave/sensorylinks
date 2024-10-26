import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Events from '../models/Events.js';

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/holiday_planner', async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

router.post('/holiday_planner', async (req, res) => {
  try {
    const { title, start, end } = req.body;
    const newEvent = new Events({ title, start, end });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
});

router.put('/holiday_planner/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start, end } = req.body;
    const updatedEvent = await Events.findByIdAndUpdate(id, { title, start, end }, { new: true });
    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
});

router.delete('/holiday_planner/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Events.findByIdAndDelete(id);
    if (deletedEvent) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});

export default router;
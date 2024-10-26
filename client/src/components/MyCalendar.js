import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, TextField, Button, Box, Typography, Modal,InputAdornment } from '@mui/material';
import axios from 'axios';
import { Event as EventIcon } from '@mui/icons-material';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/holiday_planner');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/holiday_planner', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ title: '', start: '', end: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/holiday_planner/${selectedEvent._id}`, selectedEvent);
      const updatedEvents = events.map(event => event._id === selectedEvent._id ? response.data : event);
      setEvents(updatedEvents);
      setSelectedEvent(null);
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSelectedEventChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleAddEvent} noValidate sx={{ mb: 4 }}>
        <TextField
          label="Event Title"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
         <TextField
  label="Start Date and Time"
  name="start"
  type="datetime-local"
  value={newEvent.start}
  onChange={handleInputChange}
  required
  fullWidth
  InputLabelProps={{ shrink: true }}
  InputProps={{
    style: { color: 'white' }, // Change text color to white
    endAdornment: (
        <InputAdornment position="end">
          <EventIcon style={{ color: 'white' }} /> {/* Change icon color to white */}
        </InputAdornment>
    ),
  }}
  sx={{ mb: 2 }}
/>

<TextField
  label="End Date and Time"
  name="end"
  type="datetime-local"
  value={newEvent.start}
  onChange={handleInputChange}
  required
  fullWidth
  InputLabelProps={{ shrink: true }}
  InputProps={{
    style: { color: 'white' }, // Change text color to white
    endAdornment: (
        <InputAdornment position="end">
          <EventIcon style={{ color: 'white' }} /> {/* Change icon color to white */}
        </InputAdornment>
    ),
  }}
  sx={{ mb: 2 }}
/>

        <Button type="submit" variant="contained" backgroundColor="" color="primary" fullWidth>
          Add Event
        </Button>
      </Box>
      <Calendar
        localizer={localizer}
        events={events.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginTop: 20 }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event, start, end, isSelected) => {
            if (moment(start).isSame(moment(), 'day')) {
              return {
                style: {
                  backgroundColor:'#ffe8b5', // Change the background color of the current date
                  color: '#191f45', // Change the text color of the current date
                },
              };
            }
            
            return {};
          }}
        />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">
            Update Event
          </Typography>
          <Box component="form" onSubmit={handleUpdateEvent} noValidate sx={{ mt: 2 }}>
            <TextField
              label="Event Title"
              name="title"
              value={selectedEvent?.title || ''}
              onChange={handleSelectedEventChange}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Start Date and Time"
              name="start"
              type="datetime-local"
              value={selectedEvent ? moment(selectedEvent.start).format('YYYY-MM-DDTHH:mm') : ''}
              onChange={handleSelectedEventChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="End Date and Time"
              name="end"
              type="datetime-local"
              value={selectedEvent ? moment(selectedEvent.end).format('YYYY-MM-DDTHH:mm') : ''}
              onChange={handleSelectedEventChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Event
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default MyCalendar;

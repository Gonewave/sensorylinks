import mongoose from "mongoose";
const eventSchema  = mongoose.Schema
({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  }
});

const Events = mongoose.model('holiday_planner', eventSchema);

export default Events;

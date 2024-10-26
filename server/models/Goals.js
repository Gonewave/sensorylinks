import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Goals = mongoose.model('goals', userSchema);
export default Goals;

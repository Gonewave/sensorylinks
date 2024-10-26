import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
});

const Sense = mongoose.model('Sense', userSchema);
export default Sense;
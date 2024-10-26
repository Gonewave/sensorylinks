import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
});

const Reflex = mongoose.model('Reflex', userSchema);
export default Reflex;
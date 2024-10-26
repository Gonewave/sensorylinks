import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  therapy_name: String,
  description:String
})
const Therapies=mongoose.model("therapies",UserSchema)
export default Therapies;
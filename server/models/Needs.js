import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  need_name: { type: String, required: true },
  disorder: { type: String, required: true },
})
const Needs=mongoose.model("needs",UserSchema)
export default Needs;
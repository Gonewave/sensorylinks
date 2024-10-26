
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username:String,
  fromDate:Date,
  toDate:Date,
  numberOfDays:Number,
  leaveType:String,
  status:String
})

const Vacations=mongoose.model("vacation",UserSchema)
export default Vacations;
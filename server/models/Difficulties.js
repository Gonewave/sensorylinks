import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  dtitle: String,
  ddescription:String
})
const Difficulties=mongoose.model("difficulties",UserSchema)
export default Difficulties;
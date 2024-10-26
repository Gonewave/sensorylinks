import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  surveys: Array
})

const Templates=mongoose.model("templates",UserSchema)

export default Templates;
import Designation from "../models/Designation.js"; // Ensure correct path
import jwt from "jsonwebtoken";
const JWT_SECRET = "abcd!@#$";

export const getDesignations = async (req, res) => {
    try {
        const designations = await Designation.find({});
        res.json(designations);
      } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");
      }
}

export const createDesignation= async (req, res) => {
    const { title, description } = req.body;
  try {
    let designation = await Designation.create({
      title: title,
      description: description,
    });
    res.json({ title: title, success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
}

  export const DeleteDesignation = async (req, res) => {
    try {
        let designation = await Designation.findById(req.params.id);
        if (!designation) {
          return res.status(404).send("Not Found");
        }
        designation = await Designation.findByIdAndDelete(req.params.id);
        res.json({ "Job done": "The Designation has been deleted" });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
        return;
      }
  }

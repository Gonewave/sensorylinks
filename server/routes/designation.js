import express from "express";
const router = express.Router();
import { DeleteDesignation, createDesignation, getDesignations } from "../controllers/designation.js";

router.get("/getDesignations", getDesignations);


router.post("/createDesignation", createDesignation);

router.delete("/deleteDesignation/:id", DeleteDesignation);

export default router;

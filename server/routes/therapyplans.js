import express from "express";
const router = express.Router();
import { AddTherapyPlan, GetTherapyPlans, GetAll } from "../controllers/therapyplans.js";

router.post("/addTherapyPlan", AddTherapyPlan)

router.put("/getTherapyPlans", GetTherapyPlans)

router.get("/getall", GetAll)

export default router;

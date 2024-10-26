import express from "express";
import { getSales } from "../controllers/sales.js";

const router = express.Router();

router.get("/sales", getSales);
//router.get("/overview",get)

export default router;
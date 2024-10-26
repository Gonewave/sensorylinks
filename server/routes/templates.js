import express from "express";
import { createTemplate, fetchTemplates,deleteTemplate,updateTemplate } from "../controllers/templates.js";

const router = express.Router();

router.post("/createTemplate", createTemplate);
router.get("/fetchTemplates", fetchTemplates);
router.delete("/deleteTemplate/:id",deleteTemplate);
router.put("/updateTemplate/:id",updateTemplate)
export default router;
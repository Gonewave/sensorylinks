import express from "express";
import {
  createQuestion,createReflex,createSense,getQuestion,getSpecificQuestion,getReflex,getSense,updateSense,
  deleteSense,delelteReflex,updateReflex,updateQuestion,deleteQuestion,getSurveys,addSurvey, updateScore,
  addSurveyCollections,shareAssessment,getAssessmentByToken,submitAssessment,addSharedSurveyCollections,getSharedSurveys
} from "../controllers/survey.js";
const router = express.Router();

router.post("/createSense", createSense);
router.post("/createReflex", createReflex);
router.post("/createQuestion", createQuestion);
router.get("/getSense", getSense);
router.get("/getReflex", getReflex);
router.get("/getQuestion", getQuestion);
router.put("/getSpecificQuestion", getSpecificQuestion);
router.put("/updateSense/:id", updateSense);
router.delete("/deleteSense/:id", deleteSense);
router.put("/updateReflex/:id", updateReflex);
router.delete("/deleteReflex/:id", delelteReflex);
router.put("/updateQuestion/:id", updateQuestion);
router.delete("/deleteQuestion/:id", deleteQuestion);
router.put("/getSurveys", getSurveys);
router.put("/getSharedSurveys", getSharedSurveys);
router.post("/addSurvey", addSurvey);
router.put("/updateScore", updateScore);
router.post("/addSurveyCollection", addSurveyCollections);
router.post("/addSharedSurveyCollection", addSharedSurveyCollections);
router.post("/shareAssessment", shareAssessment);
router.get('/assessment/:token', getAssessmentByToken);
router.post('/submitAssessment/:token', submitAssessment);
// router.get("/assessment/share/:token", getSharedAssessment);

export default router;
// routes/childRoutes.js
import express from "express";
import { createChild, getChildProfile, getChildren, filterChildren, deleteChild, updateChild, getIds } from "../controllers/child.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/uploads/child');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/createChild", upload.array('documents'), createChild);
router.get("/childprofile/:id", getChildProfile);
router.get("/getChild", getChildren);
router.post("/filterChild", filterChildren);
router.delete("/deleteChild/:id", deleteChild);
router.put("/updateChild/:id", updateChild);
router.get("/getids", getIds);

export default router;

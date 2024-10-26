import express from "express";
const router = express.Router();
import path from "path";
import { CreateStaff, GetStaffs, filterStaff, getSpecificStaff, DeleteStaff, UpdateStaff, UploadFile } from "../controllers/staff.js";
// require("../../client/src/uploads/staff")
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/uploads/staff");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/uploadfile", upload.single("file"), UploadFile);

router.post("/createStaff", CreateStaff);

router.get("/getStaffs", GetStaffs);

router.get("/filterStaffs", filterStaff);

router.get("/getSpecificStaff/:id", getSpecificStaff);

router.delete("/deleteStaff/:id", DeleteStaff);

router.put("/updateStaff/:id", UpdateStaff);

export default router;

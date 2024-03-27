import express from "express";
import {
  getAllJobTypes,
  addJobType,
  editJobType,
} from "../controllers/jobType.js";

const router = express.Router();

router.get("/", getAllJobTypes);
router.post("/add", addJobType);
router.put("/edit", editJobType);

export default router;

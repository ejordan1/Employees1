import express from "express"
import { getAllJobs, addJob, editJob } from "../controllers/job.js"

const router = express.Router()

router.get("/", getAllJobs)
router.put("/", addJob)
router.put("/edit", editJob)

export default router
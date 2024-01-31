import express from "express"
import { addShift } from "../controllers/shift.js"

const router = express.Router()

router.get("/", addShift)

export default router
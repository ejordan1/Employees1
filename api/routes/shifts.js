import express from "express"
import { addShift, getShift, getShifts, updateShift, deleteShift } from "../controllers/shift.js"

const router = express.Router()

router.get("/", getShifts)
router.get("/:id", getShift)
router.get("/", addShift)
router.get("/:id", deleteShift)
router.get("/:id", updateShift)

export default router
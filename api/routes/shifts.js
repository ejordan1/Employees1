import express from "express"
import { addShift, getShift, getShifts, updateShift, deleteShift } from "../controllers/shift.js"

const router = express.Router()

router.get("/", getShifts)
router.get("/:id", getShift)
router.post("/", addShift)
router.delete("/:id", deleteShift)
router.put("/", updateShift)

export default router
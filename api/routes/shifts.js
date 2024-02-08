import express from "express"
import { addShift, getShift, getShifts, updateShift, deleteShift, pickupShift, dropShift } from "../controllers/shift.js"

const router = express.Router()

router.get("/", getShifts)
router.get("/:id", getShift)
router.post("/", addShift)
router.delete("/", deleteShift)
router.put("/", updateShift)

router.put("/pickup", pickupShift)
router.put("/drop", dropShift)

export default router
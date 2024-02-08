import express from "express"
import { addShift, getShift, getShifts, editShift, deleteShift, pickupShift, dropShift } from "../controllers/shift.js"

const router = express.Router()

router.get("/", getShifts)
router.get("/:id", getShift)
router.post("/admin", addShift)
router.delete("/admin", deleteShift)
router.put("/admin", editShift)

router.put("/pickup", pickupShift)
router.put("/drop", dropShift)

export default router
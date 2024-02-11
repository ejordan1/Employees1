import express from "express"
import { addShift, getAllShifts, getMyShifts, getAvailableShifts, editShift, deleteShift, pickupShift, dropShift } from "../controllers/shift.js"

const router = express.Router()

router.get("/admin", getAllShifts)
router.post("/admin", addShift)
router.delete("/admin", deleteShift)
router.put("/admin", editShift)

router.get("/available", getAvailableShifts)
router.get("/myshifts", getMyShifts)
router.put("/pickup", pickupShift)
router.put("/drop", dropShift)

export default router
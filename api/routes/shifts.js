import express from "express"
import { addShift, getAllShifts, getMyShifts, getAvailableShifts, editShift, deleteShift, pickupShift, dropShift } from "../controllers/shift.js"

const router = express.Router()

router.get("/admin/all", getAllShifts)
router.post("/admin/add", addShift)
router.put("/admin/delete", deleteShift)
router.put("/admin/edit", editShift)

router.get("/available", getAvailableShifts)
router.get("/myshifts", getMyShifts)
router.put("/pickup", pickupShift)
router.put("/drop", dropShift)

export default router
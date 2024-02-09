import express from "express"
import {  addPerm, editPerm, getPerms } from "../controllers/perms.js"

const router = express.Router()

router.get("/", getPerms)
// router.get("/:id", getShift)
 router.post("/", addPerm)
// router.delete("/admin", deleteShift)
 router.put("/", editPerm)

// router.put("/pickup", pickupShift)
// router.put("/drop", dropShift)

export default router
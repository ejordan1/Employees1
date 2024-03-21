import express from "express"
import { getAllEmployees } from "../controllers/employee.js"

const router = express.Router()

router.get("/all", getAllEmployees)

export default router
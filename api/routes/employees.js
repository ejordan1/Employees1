import express from "express"
import { addEmployee } from "../controllers/employee.js"

const router = express.Router()

router.get("/", addEmployee)

export default router
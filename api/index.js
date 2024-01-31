import express from "express"

//the way it gets shiftsRoutes and others is magic
import shiftsRoutes from "./routes/shifts.js"
import authRoutes from "./routes/auth.js"
import employeeRoutes from "./routes/employees.js"

const app = express()

app.use(express.json())
app.use("/api/shifts", shiftsRoutes)
app.use("/api/employees", employeeRoutes)
app.use("/api/auth", authRoutes)

app.listen(8800, ()=>{
    console.log("Connected!");
})
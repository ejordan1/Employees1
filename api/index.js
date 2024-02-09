import express from "express"

//the way it gets shiftsRoutes and others is magic
import permsRoutes from "./routes/perms.js"
import fillsRoutes from "./routes/fills.js"
import shiftsRoutes from "./routes/shifts.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"

const app = express()



app.use(express.json())
app.use(cookieParser())
app.use("/api/perms", permsRoutes)
app.use("/api/fills", fillsRoutes)
app.use("/api/shifts", shiftsRoutes)
app.use("/api/auth", authRoutes)

app.listen(8800, ()=>{
    console.log("Connected!");
})
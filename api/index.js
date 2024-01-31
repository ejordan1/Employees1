import express from "express"
import shiftsRoutes from "./routes/shifts.js"

const app = express()

app.use(express.json())
app.use("/api/posts", shiftsRoutes)

app.listen(8800, ()=>{
    console.log("Connected!");
})
import express from "express"
import authRoutes from "./authRoute.js"
import studentRoutes from "./studentRoute.js";
import Attendance from "./attendanceRoute.js"

const route = express.Router()

route.use("/auth", authRoutes)
route.use("/students", studentRoutes);
route.use("/attendance", Attendance)

export default route
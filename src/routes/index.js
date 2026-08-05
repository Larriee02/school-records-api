import express from "express"
import authRoutes from "./authRoute.js"
import studentRoutes from "./studentRoute.js";
import attendanceRoutes from "./attendanceRoute.js"
import subjectRoutes from "./subjectRoute.js"
import resultRoutes from "./resultRoute.js"
import teacherRoutes from "./teacherRoute.js"
import classRoutes from "./classRoute.js"

const route = express.Router()

route.use("/auth", authRoutes)
route.use("/students", studentRoutes);
route.use("/attendance", attendanceRoutes)
route.use("/subjects", subjectRoutes)
route.use("/results", resultRoutes)
route.use("/teachers", teacherRoutes)
route.use("/classes", classRoutes)

export default route
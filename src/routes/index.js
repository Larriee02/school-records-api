import express from "express"
import authRoutes from "./authRoute.js"
import studentRoutes from "./studentRoute.js";

const route = express.Router()

route.use("/auth", authRoutes)
route.use("/students", studentRoutes);

export default route
import express from "express"
import authRoutes from "./authRoute.js"

const route = express.Router()

route.use("/auth", authRoutes)

export default route
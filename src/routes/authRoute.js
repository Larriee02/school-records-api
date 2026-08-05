import express from "express"
import { register, login } from "../controllers/authController.js"
import { registerValidator, loginValidator, validateRequest } from "../validators/authValidator.js"

const route = express.Router()

//register user
route.post("/register", registerValidator, validateRequest, register)

//login as a user
route.post("/login", loginValidator, validateRequest, login)

export default route
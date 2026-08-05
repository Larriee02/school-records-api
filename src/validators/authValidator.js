//TODO: Validate both registration and login request from client before they reach controller and service
import { body, validationResult} from "express-validator"

//validation rules for user registration
export const registerValidator = [
    body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),
    
    body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),

    body("email")
    .trim()
    .isEmail()
    .withMessage("Provide a valid email address")
    .normalizeEmail(),
    
    body("password")
    .trim()
    .isLength({min: 8})
    .withMessage("Password must be at least 8 characters long"),

    body("role")
    .isIn(["Admin", "Teacher"])
    .withMessage("Role must be either Admin or Teacher"),
]

//validation rules for user login

export const loginValidator = [
    body("email")
    .isTrim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

    body("password")
    .notEmpty()
    .withMessage("Provide a valid password")
]


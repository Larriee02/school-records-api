import { body, param } from "express-validator";

// Validate creating a teacher
export const createTeacherValidator = [
  body("userId").isUUID().withMessage("A valid user ID is required."),
  body("staffId").trim().notEmpty().withMessage("Staff ID is required."),
  body("department").optional().isString().withMessage("Department must be a string."),
  body("phone").optional().isMobilePhone("any").withMessage("Invalid phone number."),
  body("qualification").optional().isString().withMessage("Qualification must be a string.")
];

// Validate updating a teacher
export const updateTeacherValidator = [
  param("id").isUUID().withMessage("Invalid teacher ID."),
  body("staffId").optional().trim().notEmpty().withMessage("Staff ID cannot be empty."),
  body("department").optional().isString().withMessage("Department must be a string."),
  body("phone").optional().isMobilePhone("any").withMessage("Invalid phone number."),
  body("qualification").optional().isString().withMessage("Qualification must be a string.")
];

// Validate teacher ID
export const idParamValidator = [
  param("id").isUUID().withMessage("Invalid teacher ID.")
];
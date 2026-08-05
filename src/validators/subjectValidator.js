import { body, param } from "express-validator";

// Validate subject creation
export const createSubjectValidator = [
  body("name").trim().notEmpty().withMessage("Subject name is required."),
  body("code").trim().notEmpty().withMessage("Subject code is required."),
  body("teacherId").optional().isUUID().withMessage("Invalid teacher ID.")
];

// Validate subject update
export const updateSubjectValidator = [
  param("id").isUUID().withMessage("Invalid subject ID."),
  body("name").optional().trim().notEmpty().withMessage("Subject name cannot be empty."),
  body("code").optional().trim().notEmpty().withMessage("Subject code cannot be empty.")
];

// Validate assigning a teacher
export const assignTeacherValidator = [
  param("id").isUUID().withMessage("Invalid subject ID."),
  body("teacherId").isUUID().withMessage("A valid teacher ID is required.")
];

// Validate subject ID
export const idParamValidator = [
  param("id").isUUID().withMessage("Invalid subject ID.")
];
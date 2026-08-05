import { body, validationResult } from "express-validator";

// Validation rules for creating a student
export const createStudentValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("gender")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female."),

  body("dateOfBirth")
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),

  body("admissionNumber")
    .trim()
    .notEmpty()
    .withMessage("Admission number is required."),

  body("classLevel")
    .trim()
    .notEmpty()
    .withMessage("Class level is required.")
];

// Validation rules for updating a student - use optional since its not a must to update every field of a student
export const updateStudentValidator = [
  body("firstName").optional().trim().notEmpty(),

  body("lastName").optional().trim().notEmpty(),

  body("gender")
    .optional()
    .isIn(["Male", "Female"]),

  body("dateOfBirth")
    .optional()
    .isISO8601(),

  body("classLevel")
    .optional()
    .trim()
    .notEmpty()
];


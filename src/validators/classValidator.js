import { body, param } from "express-validator";

// Validate class creation
export const createClassValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Class name is required."),

  body("arm")
    .optional()
    .isString()
    .withMessage("Class arm must be a string."),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive integer."),
];

// Validate class update
export const updateClassValidator = [
  param("id")
    .isUUID()
    .withMessage("Invalid class ID."),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Class name cannot be empty."),

  body("arm")
    .optional()
    .isString()
    .withMessage("Class arm must be a string."),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive integer."),
];

// Validate class ID parameter
export const idParamValidator = [
  param("id")
    .isUUID()
    .withMessage("Invalid class ID."),
];
import { body, param } from "express-validator";

// Validate recording a result
export const createResultValidator = [
  body("studentId").isUUID().withMessage("A valid student ID is required."),
  body("subjectId").isUUID().withMessage("A valid subject ID is required."),
  body("term").isIn(["First Term", "Second Term", "Third Term"]).withMessage("Invalid term."),
  body("session").matches(/^\d{4}\/\d{4}$/).withMessage("Session must be in the format YYYY/YYYY."),
  body("caScore").isFloat({ min: 0, max: 40 }).withMessage("CA score must be between 0 and 40."),
  body("examScore").isFloat({ min: 0, max: 60 }).withMessage("Exam score must be between 0 and 60.")
];

// Validate updating a result
export const updateResultValidator = [
  param("id").isUUID().withMessage("Invalid result ID."),
  body("caScore").optional().isFloat({ min: 0, max: 40 }).withMessage("CA score must be between 0 and 40."),
  body("examScore").optional().isFloat({ min: 0, max: 60 }).withMessage("Exam score must be between 0 and 60.")
];

// Validate result ID
export const idParamValidator = [
  param("id").isUUID().withMessage("Invalid result ID.")
];

// Validate transcript request
export const transcriptParamValidator = [
  param("studentId").isUUID().withMessage("Invalid student ID.")
];

// Validate report card request
export const reportCardParamValidator = [
  param("studentId").isUUID().withMessage("Invalid student ID."),
  param("term").isIn(["First Term", "Second Term", "Third Term"]).withMessage("Invalid term."),
  param("session").matches(/^\d{4}\/\d{4}$/).withMessage("Session must be in the format YYYY/YYYY.")
];
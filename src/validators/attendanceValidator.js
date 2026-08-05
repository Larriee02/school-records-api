import { body, validationResult } from "express-validator";

// Validation rules for creating attendance
export const createAttendanceValidator = [
  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required.")
    .isUUID()
    .withMessage("Student ID must be a valid UUID."),

  body("date")
    .notEmpty()
    .withMessage("Date is required.")
    .isISO8601()
    .withMessage("Date must be a valid date."),

  body("status")
    .notEmpty()
    .withMessage("Attendance status is required.")
    .isIn(["Present", "Absent", "Late"])
    .withMessage("Status must be Present, Absent, or Late."),
];

// Validation rules for updating attendance
export const updateAttendanceValidator = [
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid date."),

  body("status")
    .optional()
    .isIn(["Present", "Absent", "Late"])
    .withMessage("Status must be Present, Absent, or Late.")
];

// Return validation errors
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};
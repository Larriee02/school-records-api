import { Router } from "express";

import {
  create,
  getAll,
  getById,
  getByStudent,
  update,
  remove,
} from "../controllers/attendanceController.js";

import {
  createAttendanceValidator,
  updateAttendanceValidator
} from "../validators/attendanceValidator.js";

import { validateRequest } from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();


// Mark attendance
router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  createAttendanceValidator,
  validateRequest,
  create
);

// Get all attendance records
router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  getAll
);

// Get attendance history for a student
router.get(
  "/student/:studentId",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  getByStudent
);

// Get attendance by ID
router.get(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  getById
);

// Update attendance
router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  updateAttendanceValidator,
  validateRequest,
  update
);

// Delete attendance (admin only)
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  remove
);

export default router;
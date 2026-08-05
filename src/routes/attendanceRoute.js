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
  updateAttendanceValidator,
  validateRequest,
} from "../validators/attendanceValidator.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Attendance Routes
|--------------------------------------------------------------------------
*/

// Mark attendance
router.post(
  "/",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  createAttendanceValidator,
  validateRequest,
  create
);

// Get all attendance records
router.get(
  "/",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  getAll
);

// Get attendance history for a student
router.get(
  "/student/:studentId",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  getByStudent
);

// Get attendance by ID
router.get(
  "/:id",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  getById
);

// Update attendance
router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  updateAttendanceValidator,
  validateRequest,
  update
);

// Delete attendance (Admin only)
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("Admin"),
  remove
);

export default router;
/**
 * @swagger
 * tags:
 *   - name: Attendance
 *     description: Student attendance management
 *
 * /api/v1/attendance:
 *   post:
 *     summary: Mark student attendance
 *     description: Mark a student's attendance for a specific date. A student cannot have more than one attendance record for the same date.
 *     tags:
 *       - Attendance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAttendance'
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *       400:
 *         description: Invalid attendance data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators and teachers can mark attendance
 *       404:
 *         description: Student not found
 *       409:
 *         description: Attendance has already been marked for this student on the selected date
 *
 *   get:
 *     summary: Get all attendance records
 *     description: Retrieve all attendance records with student information.
 *     tags:
 *       - Attendance
 *     responses:
 *       200:
 *         description: Attendance records retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators and teachers can view attendance
 *
 * /api/v1/attendance/student/{studentId}:
 *   get:
 *     summary: Get attendance history for a student
 *     description: Retrieve all attendance records belonging to a specific student.
 *     tags:
 *       - Attendance
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         description: Student UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 1331a0ec-f6a4-4814-9a0f-d42114593cf0
 *     responses:
 *       200:
 *         description: Student attendance history retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators and teachers can view attendance
 *       404:
 *         description: Student not found
 *
 * /api/v1/attendance/{id}:
 *   get:
 *     summary: Get attendance record by ID
 *     description: Retrieve a specific attendance record.
 *     tags:
 *       - Attendance
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Attendance record UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 4d7e8f21-6a3b-4f9c-b5d2-123456789abc
 *     responses:
 *       200:
 *         description: Attendance record retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators and teachers can view attendance
 *       404:
 *         description: Attendance record not found
 *
 *   put:
 *     summary: Update an attendance record
 *     description: Update the date or attendance status of an existing attendance record.
 *     tags:
 *       - Attendance
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Attendance record UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 4d7e8f21-6a3b-4f9c-b5d2-123456789abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAttendance'
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       400:
 *         description: Invalid attendance data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators and teachers can update attendance
 *       404:
 *         description: Attendance record not found
 *
 *   delete:
 *     summary: Delete an attendance record
 *     description: Delete an attendance record. Only administrators can perform this action.
 *     tags:
 *       - Attendance
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Attendance record UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 4d7e8f21-6a3b-4f9c-b5d2-123456789abc
 *     responses:
 *       200:
 *         description: Attendance record deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can delete attendance
 *       404:
 *         description: Attendance record not found
 */

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


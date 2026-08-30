/**
 * @swagger
 * tags:
 *   - name: Students
 *     description: Student management
 *
 * /api/v1/students:
 *   get:
 *     summary: Get all students
 *     description: Retrieve all students.
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: Students retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 *   post:
 *     summary: Create a new student
 *     description: Creates a new student record.
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudent'
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid student data
 *       409:
 *         description: Admission number already exists
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can create students
 *
 * /api/v1/students/search:
 *   get:
 *     summary: Search students
 *     description: Search students by first name or last name.
 *     tags:
 *       - Students
 *     parameters:
 *       - name: keyword
 *         in: query
 *         required: true
 *         description: Name or part of a student's name
 *         schema:
 *           type: string
 *         example: John
 *     responses:
 *       200:
 *         description: Matching students retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 * /api/v1/students/class/{classLevel}:
 *   get:
 *     summary: Get students by class
 *     description: Retrieve all students belonging to a specific class.
 *     tags:
 *       - Students
 *     parameters:
 *       - name: classLevel
 *         in: path
 *         required: true
 *         description: Class level of the students
 *         schema:
 *           type: string
 *         example: Form 5
 *     responses:
 *       200:
 *         description: Students retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 * /api/v1/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Student UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 1331a0ec-f6a4-4814-9a0f-d42114593cf0
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *       404:
 *         description: Student not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 *   put:
 *     summary: Update a student
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Student UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 1331a0ec-f6a4-4814-9a0f-d42114593cf0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStudent'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid student data
 *       404:
 *         description: Student not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 *   delete:
 *     summary: Delete a student
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Student UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 1331a0ec-f6a4-4814-9a0f-d42114593cf0
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can delete students
 */

import { Router } from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
  filterByClass
} from "../controllers/studentController.js";

import {
  createStudentValidator,
  updateStudentValidator
} from "../validators/studentValidator.js";

import { validateRequest } from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const route = Router();


// Create a student (admin only)
route.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  createStudentValidator,
  validateRequest,
  create
);

// Get all students (admin & teacher)
route.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  getAll
);

// Search students by name
route.get(
  "/search",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  search
);

// Filter students by class
route.get(
  "/class/:classId",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  filterByClass
);

// Get one student
route.get(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  getById
);

// Update student
route.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "teacher"),
  updateStudentValidator,
  validateRequest,
  update
);

// Delete student (admin only)
route.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  remove
);

export default route;


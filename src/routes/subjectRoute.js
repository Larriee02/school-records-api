/**
 * @swagger
 * tags:
 *   - name: Subjects
 *     description: Subject management
 *
 * /api/v1/subjects:
 *   post:
 *     summary: Create a new subject
 *     description: Create a new subject. Only administrators can perform this action.
 *     tags:
 *       - Subjects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubject'
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       400:
 *         description: Invalid subject data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can create subjects
 *       409:
 *         description: A subject with this code already exists
 *
 *   get:
 *     summary: Get all subjects
 *     description: Retrieve all subjects with their assigned teacher information.
 *     tags:
 *       - Subjects
 *     responses:
 *       200:
 *         description: Subjects retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 * /api/v1/subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     description: Retrieve a subject and its assigned teacher.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Subject UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 7b6f2d3e-4c8a-4f7d-9e21-123456789abc
 *     responses:
 *       200:
 *         description: Subject retrieved successfully
 *       400:
 *         description: Invalid subject ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *       404:
 *         description: Subject not found
 *
 *   put:
 *     summary: Update a subject
 *     description: Update an existing subject. Only administrators can perform this action.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Subject UUID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSubject'
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       400:
 *         description: Invalid subject data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can update subjects
 *       404:
 *         description: Subject not found
 *
 *   delete:
 *     summary: Delete a subject
 *     description: Delete an existing subject. Only administrators can perform this action.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Subject UUID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Subject deleted successfully
 *       400:
 *         description: Invalid subject ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can delete subjects
 *       404:
 *         description: Subject not found
 *
 * /api/v1/subjects/{id}/assign-teacher:
 *   patch:
 *     summary: Assign a teacher to a subject
 *     description: Assign an existing teacher profile to a subject.
 *     tags:
 *       - Subjects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Subject UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 7b6f2d3e-4c8a-4f7d-9e21-123456789abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignTeacher'
 *     responses:
 *       200:
 *         description: Teacher assigned to subject successfully
 *       400:
 *         description: Invalid subject or teacher data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can assign teachers
 *       404:
 *         description: Subject or teacher not found
 */

import { Router } from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
  assign
} from "../controllers/subjectController.js";

import {
  createSubjectValidator,
  updateSubjectValidator,
  assignTeacherValidator,
  idParamValidator
} from "../validators/subjectValidator.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";

const router = Router();

// Protect all routes
router.use(authenticateUser);

// Create a subject
router.post("/", authorizeRoles("admin"), createSubjectValidator, validateRequest, create);

// Get all subjects
router.get("/", authorizeRoles("admin", "teacher"), getAll);

// Get a subject by ID
router.get("/:id", authorizeRoles("admin", "teacher"), idParamValidator, validateRequest, getById);

// Update a subject
router.put("/:id", authorizeRoles("admin"), updateSubjectValidator, validateRequest, update);

// Delete a subject
router.delete("/:id", authorizeRoles("admin"), idParamValidator, validateRequest, remove);

// Assign a teacher to a subject
router.patch("/:id/assign-teacher", authorizeRoles("admin"), assignTeacherValidator, validateRequest, assign);

export default router;


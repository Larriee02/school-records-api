/**
 * @swagger
 * tags:
 *   - name: Teachers
 *     description: Teacher management
 *
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve all teacher profiles with their linked user information.
 *     tags:
 *       - Teachers
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 1
 *
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of teachers per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *         example: 20
 *
 *     responses:
 *       200:
 *         description: Teachers retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 *   post:
 *     summary: Create a teacher profile
 *     description: Creates a teacher profile and links it to an existing user account.
 *     tags:
 *       - Teachers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeacher'
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *       400:
 *         description: Invalid teacher data
 *       404:
 *         description: Linked user account not found
 *       409:
 *         description: User already has a teacher profile or staff ID/phone already exists
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can create teachers
 *
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     description: Retrieve a teacher profile and its linked user information.
 *     tags:
 *       - Teachers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Teacher UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: fd00673d-8d02-443b-8d97-7bf11eb318eb
 *     responses:
 *       200:
 *         description: Teacher retrieved successfully
 *       404:
 *         description: Teacher not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 *   put:
 *     summary: Update a teacher
 *     description: Update an existing teacher profile.
 *     tags:
 *       - Teachers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Teacher UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: fd00673d-8d02-443b-8d97-7bf11eb318eb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTeacher'
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       400:
 *         description: Invalid teacher data
 *       404:
 *         description: Teacher not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can update teachers
 *
 *   delete:
 *     summary: Delete a teacher
 *     description: Deletes a teacher profile.
 *     tags:
 *       - Teachers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Teacher UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: fd00673d-8d02-443b-8d97-7bf11eb318eb
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can delete teachers
 */

import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove
} from "../controllers/teacherController.js";
import {
  createTeacherValidator,
  updateTeacherValidator,
  idParamValidator
} from "../validators/teacherValidator.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protect all teacher routes
router.use(authenticateUser);

// Get all teachers and create a teacher
router
  .route("/")
  .get(
    authorizeRoles("admin", "teacher"),
    getAll
  )
  .post(
    authorizeRoles("admin"),
    createTeacherValidator,
    validateRequest,
    create
  );

// Get, update and delete a teacher
router
  .route("/:id")
  .get(
    authorizeRoles("admin", "teacher"),
    idParamValidator,
    validateRequest,
    getById
  )
  .put(
    authorizeRoles("admin"),
    updateTeacherValidator,
    validateRequest,
    update
  )
  .delete(
    authorizeRoles("admin"),
    idParamValidator,
    validateRequest,
    remove
  );

export default router;
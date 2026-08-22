/**
 * @swagger
 * tags:
 *   - name: Classes
 *     description: School class management
 *
 * /classes:
 *   post:
 *     summary: Create a new class
 *     tags:
 *       - Classes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClass'
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Invalid class data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 *   get:
 *     summary: Get all classes
 *     tags:
 *       - Classes
 *     responses:
 *       200:
 *         description: Classes retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 * /classes/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags:
 *       - Classes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Class UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: dd2297d9-e17c-4900-8cef-84e1f5eca9e0
 *     responses:
 *       200:
 *         description: Class retrieved successfully
 *       404:
 *         description: Class not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 *   put:
 *     summary: Update a class
 *     tags:
 *       - Classes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Class UUID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClass'
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       404:
 *         description: Class not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 *   delete:
 *     summary: Delete a class
 *     tags:
 *       - Classes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Class UUID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 *
 * /classes/{id}/students:
 *   get:
 *     summary: Get all students in a class
 *     tags:
 *       - Classes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Class UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: dd2297d9-e17c-4900-8cef-84e1f5eca9e0
 *     responses:
 *       200:
 *         description: Students in the class retrieved successfully
 *       404:
 *         description: Class not found
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized
 */

import { Router } from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
  getStudents
} from "../controllers/classController.js";

import {
  createClassValidator,
  updateClassValidator,
  idParamValidator
} from "../validators/classValidator.js";

import { validateRequest } from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = Router();



// Protect all routes
router.use(authenticateUser);

// Create a new class
router.post(
  "/",
  authorizeRoles("admin"),
  createClassValidator,
  validateRequest,
  create
);

// Get all classes
router.get(
  "/",
  authorizeRoles("admin", "teacher"),
  getAll
);

// Get students in a class
router.get(
  "/:id/students",
  authorizeRoles("admin", "teacher"),
  idParamValidator,
  validateRequest,
  getStudents
);

// Get a class by ID
router.get(
  "/:id",
  authorizeRoles("admin", "teacher"),
  idParamValidator,
  validateRequest,
  getById
);

// Update a class
router.put(
  "/:id",
  authorizeRoles("admin"),
  updateClassValidator,
  validateRequest,
  update
);

// Delete a class
router.delete(
  "/:id",
  authorizeRoles("admin"),
  idParamValidator,
  validateRequest,
  remove
);

export default router;
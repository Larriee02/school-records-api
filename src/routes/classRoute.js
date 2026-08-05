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
  authorizeRoles("Admin"),
  createClassValidator,
  validateRequest,
  create
);

// Get all classes
router.get(
  "/",
  authorizeRoles("Admin", "Teacher"),
  getAll
);

// Get students in a class
router.get(
  "/:id/students",
  authorizeRoles("Admin", "Teacher"),
  idParamValidator,
  validateRequest,
  getStudents
);

// Get a class by ID
router.get(
  "/:id",
  authorizeRoles("Admin", "Teacher"),
  idParamValidator,
  validateRequest,
  getById
);

// Update a class
router.put(
  "/:id",
  authorizeRoles("Admin"),
  updateClassValidator,
  validateRequest,
  update
);

// Delete a class
router.delete(
  "/:id",
  authorizeRoles("Admin"),
  idParamValidator,
  validateRequest,
  remove
);

export default router;
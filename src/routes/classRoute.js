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
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
router.post("/", authorizeRoles("Admin"), createSubjectValidator, validateRequest, create);

// Get all subjects
router.get("/", authorizeRoles("Admin", "Teacher"), getAll);

// Get a subject by ID
router.get("/:id", authorizeRoles("Admin", "Teacher"), idParamValidator, validateRequest, getById);

// Update a subject
router.put("/:id", authorizeRoles("Admin"), updateSubjectValidator, validateRequest, update);

// Delete a subject
router.delete("/:id", authorizeRoles("Admin"), idParamValidator, validateRequest, remove);

// Assign a teacher to a subject
router.patch("/:id/assign-teacher", authorizeRoles("Admin"), assignTeacherValidator, validateRequest, assign);

export default router;
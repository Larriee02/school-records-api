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
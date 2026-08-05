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
  "/class/:classLevel",
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
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
  updateStudentValidator,
  validateRequest,
} from "../validators/studentValidator.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const route = Router();


// Create a student (Admin only)
route.post(
  "/",
  authenticateUser,
  authorizeRoles("Admin"),
  createStudentValidator,
  validateRequest,
  create
);

// Get all students (Admin & Teacher)
route.get(
  "/",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  getAll
);

// Search students by name
route.get(
  "/search",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  search
);

// Filter students by class
route.get(
  "/class/:classLevel",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  filterByClass
);

// Get one student
route.get(
  "/:id",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  getById
);

// Update student
route.put(
  "/:id",
  authenticateUser,
  authorizeRoles("Admin", "Teacher"),
  updateStudentValidator,
  validateRequest,
  update
);

// Delete student (Admin only)
route.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("Admin"),
  remove
);

export default route;
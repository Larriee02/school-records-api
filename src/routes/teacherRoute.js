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
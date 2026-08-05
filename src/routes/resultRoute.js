import express from "express";
import {
  create,
  getById,
  update,
  remove,
  getTranscript,
  getReportCard
} from "../controllers/resultController.js";
import {
  createResultValidator,
  updateResultValidator,
  idParamValidator,
  transcriptParamValidator,
  reportCardParamValidator
} from "../validators/resultValidator.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protect all result routes
router.use(authenticateUser);

// Record a student's result
router.post(
  "/",
  authorizeRoles("admin", "teacher"),
  createResultValidator,
  validateRequest,
  create
);

// Get, update and delete a result
router
  .route("/:id")
  .get(
    authorizeRoles("admin", "teacher", "student"),
    idParamValidator,
    validateRequest,
    getById
  )
  .put(
    authorizeRoles("admin", "teacher"),
    updateResultValidator,
    validateRequest,
    update
  )
  .delete(
    authorizeRoles("admin"),
    idParamValidator,
    validateRequest,
    remove
  );

// Get student's transcript
router.get(
  "/transcript/:studentId",
  authorizeRoles("admin", "teacher", "student"),
  transcriptParamValidator,
  validateRequest,
  getTranscript
);

// Generate report card
router.get(
  "/report-card/:studentId/:term/:session",
  authorizeRoles("admin", "teacher", "student"),
  reportCardParamValidator,
  validateRequest,
  getReportCard
);

export default router;
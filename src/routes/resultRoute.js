/**
 * @swagger
 * tags:
 *   - name: Results
 *     description: Student academic results management
 *
 * /api/v1/results:
 *   post:
 *     summary: Record a student's result
 *     description: Record a student's CA and examination scores. The total score, grade and remark are calculated automatically.
 *     tags:
 *       - Results
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResult'
 *     responses:
 *       201:
 *         description: Result recorded successfully
 *       400:
 *         description: Invalid result data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators and teachers can record results
 *       404:
 *         description: Student or subject not found
 *       409:
 *         description: A result already exists for this student, subject, term and session
 *
 * /api/v1/results/{id}:
 *   get:
 *     summary: Get a result by ID
 *     description: Retrieve a specific student result.
 *     tags:
 *       - Results
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Result UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 7f4d3e21-6a3b-4f9c-b5d2-123456789abc
 *     responses:
 *       200:
 *         description: Result retrieved successfully
 *       400:
 *         description: Invalid result ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized to view this result
 *       404:
 *         description: Result not found
 *
 *   put:
 *     summary: Update a result
 *     description: Update a student's CA or examination score. The total score, grade and remark are recalculated automatically.
 *     tags:
 *       - Results
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Result UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 7f4d3e21-6a3b-4f9c-b5d2-123456789abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateResult'
 *     responses:
 *       200:
 *         description: Result updated successfully
 *       400:
 *         description: Invalid result data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators and teachers can update results
 *       404:
 *         description: Result not found
 *
 *   delete:
 *     summary: Delete a result
 *     description: Delete a student's result. Only administrators can perform this action.
 *     tags:
 *       - Results
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Result UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 7f4d3e21-6a3b-48f9-b5d2-123456789abc
 *     responses:
 *       200:
 *         description: Result deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only administrators can delete results
 *       404:
 *         description: Result not found
 *
 * /api/v1/results/transcript/{studentId}:
 *   get:
 *     summary: Get a student's transcript
 *     description: Retrieve the complete academic history of a student across sessions and terms.
 *     tags:
 *       - Results
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         description: Student UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 1331a0ec-f6a4-4814-9a0f-d42114593cf0
 *     responses:
 *       200:
 *         description: Student transcript retrieved successfully
 *       400:
 *         description: Invalid student ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized to view the transcript
 *       404:
 *         description: Student not found
 *
 * /api/v1/results/report-card/{studentId}/{term}/{session}:
 *   get:
 *     summary: Generate a student's report card
 *     description: Generate a report card containing subject results and the student's overall average for a selected term and academic session.
 *     tags:
 *       - Results
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         description: Student UUID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 1331a0ec-f6a4-4814-9a0f-d42114593cf0
 *
 *       - name: term
 *         in: path
 *         required: true
 *         description: Academic term
 *         schema:
 *           type: string
 *           enum:
 *             - First Term
 *             - Second Term
 *             - Third Term
 *         example: First Term
 *
 *       - name: session
 *         in: path
 *         required: true
 *         description: Academic session in YYYY/YYYY format
 *         schema:
 *           type: string
 *           pattern: "^\\d{4}/\\d{4}$"
 *         example: 2025/2026
 *
 *       - name: notify
 *         in: query
 *         required: false
 *         description: Send the report card to the student's email when set to true.
 *         schema:
 *           type: boolean
 *           default: false
 *         example: false
 *
 *     responses:
 *       200:
 *         description: Report card generated successfully
 *       400:
 *         description: Invalid report card parameters
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User is not authorized to view the report card
 *       404:
 *         description: Student not found or no results found for the selected term and session
 */


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


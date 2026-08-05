import {
  recordResult,
  getResultById,
  updateResult,
  deleteResult,
  getStudentTranscript,
  generateReportCard
} from "../services/resultService.js";

// Record a student's result
export const create = async (req, res, next) => {
  try {
    const result = await recordResult(req.body);

    return res.status(201).json({
      success: true,
      message: "Result recorded successfully.",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Get result by ID
export const getById = async (req, res, next) => {
  try {
    const result = await getResultById(req.params.id);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Update a result
export const update = async (req, res, next) => {
  try {
    const result = await updateResult(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Result updated successfully.",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Delete a result
export const remove = async (req, res, next) => {
  try {
    await deleteResult(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Result deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

// Get a student's transcript
export const getTranscript = async (req, res, next) => {
  try {
    const transcript = await getStudentTranscript(req.params.studentId);

    return res.status(200).json({
      success: true,
      data: transcript
    });
  } catch (error) {
    next(error);
  }
};

// Generate a student's report card
export const getReportCard = async (req, res, next) => {
  try {
    const { studentId, term, session } = req.params;
    const notify = req.query.notify === "true";

    const reportCard = await generateReportCard(studentId, term, session, { notify });

    return res.status(200).json({
      success: true,
      data: reportCard
    });
  } catch (error) {
    next(error);
  }
};
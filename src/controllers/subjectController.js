import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  assignTeacher,
} from "../services/subjectService.js";

// Create a new subject
export const create = async (req, res, next) => {
  try {
    const subject = await createSubject(req.body);

    return res.status(201).json({
      success: true,
      message: "Subject created successfully.",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

// Get all subjects
export const getAll = async (req, res, next) => {
  try {
    const subjects = await getAllSubjects();

    return res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

// Get a subject by ID
export const getById = async (req, res, next) => {
  try {
    const subject = await getSubjectById(req.params.id);

    return res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

// Update a subject
export const update = async (req, res, next) => {
  try {
    const subject = await updateSubject(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully.",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a subject
export const remove = async (req, res, next) => {
  try {
    await deleteSubject(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Assign a teacher to a subject
export const assign = async (req, res, next) => {
  try {
    const subject = await assignTeacher(req.params.id, req.body.teacherId);

    return res.status(200).json({
      success: true,
      message: "Teacher assigned successfully.",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} from "../services/teacherService.js";

// Create a teacher
export const create = async (req, res, next) => {
  try {
    const teacher = await createTeacher(req.body);

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully.",
      data: teacher
    });
  } catch (error) {
    next(error);
  }
};

// Get all teachers
export const getAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const result = await getAllTeachers({
      page: Number(page) || 1,
      limit: Number(limit) || 20
    });

    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

// Get teacher by ID
export const getById = async (req, res, next) => {
  try {
    const teacher = await getTeacherById(req.params.id);

    return res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    next(error);
  }
};

// Update a teacher
export const update = async (req, res, next) => {
  try {
    const teacher = await updateTeacher(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully.",
      data: teacher
    });
  } catch (error) {
    next(error);
  }
};

// Delete a teacher
export const remove = async (req, res, next) => {
  try {
    await deleteTeacher(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};
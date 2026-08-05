import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  getStudentsInClass,
} from "../services/classService.js";

// Create a new class
export const create = async (req, res, next) => {
  try {
    const schoolClass = await createClass(req.body);

    return res.status(201).json({
      success: true,
      message: "Class created successfully.",
      data: schoolClass,
    });
  } catch (error) {
    next(error);
  }
};

// Get all classes
export const getAll = async (req, res, next) => {
  try {
    const classes = await getAllClasses();

    return res.status(200).json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

// Get a class by ID
export const getById = async (req, res, next) => {
  try {
    const schoolClass = await getClassById(req.params.id);

    return res.status(200).json({
      success: true,
      data: schoolClass,
    });
  } catch (error) {
    next(error);
  }
};

// Update a class
export const update = async (req, res, next) => {
  try {
    const schoolClass = await updateClass(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Class updated successfully.",
      data: schoolClass,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a class
export const remove = async (req, res, next) => {
  try {
    await deleteClass(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Get all students in a class
export const getStudents = async (req, res, next) => {
  try {
    const students = await getStudentsInClass(req.params.id);

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
};
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
  getStudentsByClass
} from "../services/studentService.js";

// Create a new student
export const create = async (req, res, next) => {
  try {
    const student = await createStudent(req.body);

    return res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Get all students
export const getAll = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Get a student by ID
export const getById = async (req, res, next) => {
  try {
    const student = await getStudentById(req.params.id);

    if (!student) {
      const error = new Error("Student not found.");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

// Update a student
export const update = async (req, res, next) => {
  try {
    const student = await updateStudent(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a student
export const remove = async (req, res, next) => {
  try {
    await deleteStudent(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Search students by name
export const search = async (req, res, next) => {
  try {
    const students = await searchStudents(req.query.keyword);

    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Filter students by class
export const filterByClass = async (req, res, next) => {
  try {
    const students = await getStudentsByClass(req.params.classId);

    return res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};
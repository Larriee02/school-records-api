import {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
} from "../services/attendanceService.js";

// Mark attendance
export const create = async (req, res, next) => {
  try {
    const attendance = await createAttendance(req.body);

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully.",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get all attendance records
export const getAll = async (req, res, next) => {
  try {
    const attendance = await getAllAttendance();

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance by ID
export const getById = async (req, res, next) => {
  try {
    const attendance = await getAttendanceById(req.params.id);

    if (!attendance) {
      const error = new Error("Attendance record not found.");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance history for a student
export const getByStudent = async (req, res, next) => {
  try {
    const attendance = await getAttendanceByStudent(req.params.studentId);

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Update attendance
export const update = async (req, res, next) => {
  try {
    const attendance = await updateAttendance(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully.",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Delete attendance
export const remove = async (req, res, next) => {
  try {
    await deleteAttendance(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Attendance record deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
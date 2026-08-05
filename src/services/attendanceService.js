import Attendance from "../models/attendanceModel.js";
import Student from "../models/studentModel.js";

// Mark attendance
export async function createAttendance(attendanceData) {
  const { studentId, date } = attendanceData;

  // Ensure the student exists
  const student = await Student.findByPk(studentId);

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  // Prevent duplicate attendance for the same date
  const existingAttendance = await Attendance.findOne({ where: {studentId, date}});

  if (existingAttendance) {
    const error = new Error("Attendance has already been marked for this student on the selected date.");
    error.statusCode = 409;
    throw error;
  }

  return await Attendance.create(attendanceData);
}

// Get all attendance records
export async function getAllAttendance() {
  return await Attendance.findAll({
    include: [
        {
            model: Student,
            attributes: [
            "id",
            "firstName",
            "lastName",
            "admissionNumber",
            ]
        }
    ],
    order: [["date", "DESC"]],
  });
}

// Get attendance by ID
export async function getAttendanceById(id) {
  return await Attendance.findByPk(id, {
    include: [
        {
            model: Student,
            attributes: [
            "id",
            "firstName",
            "lastName",
            "admissionNumber",
            ]
        }
    ]
  });
}

// Get attendance history for one student
export async function getAttendanceByStudent(studentId) {
  return await Attendance.findAll({
    where: {
      studentId,
    },
    order: [["date", "DESC"]],
  });
}

// Update attendance
export async function updateAttendance(id, updatedData) {
  const attendance = await Attendance.findByPk(id);

  if (!attendance) {
    const error = new Error("Attendance record not found.");
    error.statusCode = 404;
    throw error;
  }

  await attendance.update(updatedData);

  return attendance;
}

// Delete attendance
export async function deleteAttendance(id) {
  const attendance = await Attendance.findByPk(id);

  if (!attendance) {
    const error = new Error("Attendance record not found.");
    error.statusCode = 404;
    throw error;
  }

  await attendance.destroy();
}
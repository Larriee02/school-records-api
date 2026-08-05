import { Op } from "sequelize"; //for searching
import Student from "../models/studentModel.js";

// Create a new student
export async function createStudent(studentData) {
  // Ensure admission number is unique
  const existingStudent = await Student.findOne({where: {admissionNumber: studentData.admissionNumber}});

  if (existingStudent) {
    const error = new Error("Admission number already exists.");
    error.statusCode = 409;
    throw error;
  }

  const student = await Student.create(studentData);

  return student;
}

// Get all students
export async function getAllStudents() {
  return await Student.findAll({
    order: [["createdAt", "DESC"]],
  });
}

// Get one student by ID
export async function getStudentById(id) {
  return await Student.findByPk(id);
}

// Update a student
export async function updateStudent(id, updatedData) {
  const student = await Student.findByPk(id);

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  await student.update(updatedData);

  return student;
}

// Delete a student
export async function deleteStudent(id) {
  const student = await Student.findByPk(id);

  if (!student) {
    throw new Error("Student not found.");
  }

  await student.destroy();

  return;
}

// Search students by first or last name
export async function searchStudents(keyword) {
  return await Student.findAll({
    where: {
      [Op.or]: [
        {
          firstName: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${keyword}%`,
          },
        }
      ],
    },
    order: [["firstName", "ASC"]],
  });
}

// Filter students by class
// Get students by class
export async function getStudentsByClass(classId) {
  return await Student.findAll({
    where: {
      classId,
    },
    order: [["lastName", "ASC"]],
  });
}
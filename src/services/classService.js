import { SchoolClass, Student } from "../models/index.js";

// Create a new class
export async function createClass(classData) {
  const { name, arm, capacity } = classData;

  // Check if a class with the same name and arm already exists
  const existingClass = await SchoolClass.findOne({
    where: {
      name,
      arm
    },
  });

  if (existingClass) {
    const error = new Error(
      "A class with this name and arm already exists."
    )
    error.statusCode = 409;
    throw error;
  }

  return await SchoolClass.create({
    name,
    arm,
    capacity
  });
}

// Get all classes
export async function getAllClasses() {
  return await SchoolClass.findAll({
    order: [["name", "ASC"]]
  });
}

// Get a class by ID
export async function getClassById(id) {
  const schoolClass = await SchoolClass.findByPk(id);

  if (!schoolClass) {
    const error = new Error("Class not found.");
    error.statusCode = 404;
    throw error;
  }

  return schoolClass;
}

// Update a class
export async function updateClass(id, updatedData) {
  const schoolClass = await getClassById(id);

  // NOTE:
  // We'll add duplicate validation for name + arm
  // during the final testing phase.

  await schoolClass.update(updatedData);

  return schoolClass;
}

// Delete a class
export async function deleteClass(id) {
  const schoolClass = await getClassById(id);

  // Prevent deleting a class that still has students
  const studentCount = await Student.count({
    where: {
      classId: id,
    },
  });

  if (studentCount > 0) {
    const error = new Error(
      "Cannot delete a class that still has students assigned to it."
    );
    error.statusCode = 400;
    throw error;
  }

  await schoolClass.destroy();
}

// Get all students in a class
export async function getStudentsInClass(id) {
  // Ensure the class exists
  await getClassById(id);

  return await Student.findAll({
    where: {
      classId: id,
    },
    attributes: [
      "id",
      "admissionNumber",
      "firstName",
      "lastName"
    ],
    order: [["lastName", "ASC"]],
  });
}
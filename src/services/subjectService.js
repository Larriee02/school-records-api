import { Subject, Teacher, User } from "../models/index.js";

// Create a new subject
export async function createSubject(subjectData) {
  const { name, code, teacherId } = subjectData;

  const existingSubject = await Subject.findOne({ where: { code } });

  if (existingSubject) {
    const error = new Error("A subject with this code already exists.");
    error.statusCode = 409;
    throw error;
  }

  if (teacherId) {
    const teacher = await Teacher.findByPk(teacherId);

    if (!teacher) {
      const error = new Error("Teacher not found.");
      error.statusCode = 404;
      throw error;
    }
  }

  return await Subject.create({
    name,
    code,
    teacherId: teacherId || null
  });
}

// Get all subjects
export async function getAllSubjects() {
  return await Subject.findAll({
    include: [{
      model: Teacher,
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName", "email"]
      }]
    }],
    order: [["name", "ASC"]]
  });
}

// Get subject by ID
export async function getSubjectById(id) {
  const subject = await Subject.findByPk(id, {
    include: [{
      model: Teacher,
      include: [{
        model: User,
        attributes: ["id", "firstName", "lastName", "email"]
      }]
    }]
  });

  if (!subject) {
    const error = new Error("Subject not found.");
    error.statusCode = 404;
    throw error;
  }

  return subject;
}

// Update a subject
export async function updateSubject(id, updatedData) {
  const subject = await getSubjectById(id);

  // Duplicate code validation will be added during final testing
  await subject.update(updatedData);

  return subject;
}

// Delete a subject
export async function deleteSubject(id) {
  const subject = await getSubjectById(id);

  await subject.destroy();
}

// Assign a teacher to a subject
export async function assignTeacher(subjectId, teacherId) {
  const subject = await getSubjectById(subjectId);

  const teacher = await Teacher.findByPk(teacherId);

  if (!teacher) {
    const error = new Error("Teacher not found.");
    error.statusCode = 404;
    throw error;
  }

  await subject.update({ teacherId });

  return await getSubjectById(subjectId);
}
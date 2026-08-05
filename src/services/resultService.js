import { Result, Student, Subject } from "../models/index.js";
import { calculateGrade } from "../utils/calculateGrade.js";
import { sendResultNotification } from "./emailService.js";

// Record a student's result
export async function recordResult(resultData) {
  const { studentId, subjectId, term, session, caScore, examScore } = resultData;

  const student = await Student.findByPk(studentId);

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  const subject = await Subject.findByPk(subjectId);

  if (!subject) {
    const error = new Error("Subject not found.");
    error.statusCode = 404;
    throw error;
  }

  const existingResult = await Result.findOne({
    where: { studentId, subjectId, term, session }
  });

  if (existingResult) {
    const error = new Error("A result already exists for this student, subject, term and session.");
    error.statusCode = 409;
    throw error;
  }

  const { totalScore, grade, remark } = calculateGrade(caScore, examScore);

  return await Result.create({
    studentId,
    subjectId,
    term,
    session,
    caScore,
    examScore,
    totalScore,
    grade,
    remark
  });
}

// Get a result by ID
export async function getResultById(id) {
  const result = await Result.findByPk(id, {
    include: [
      {
        model: Student,
        attributes: ["id", "firstName", "lastName", "admissionNumber", "email"]
      },
      {
        model: Subject,
        attributes: ["id", "name", "code"]
      }
    ]
  });

  if (!result) {
    const error = new Error("Result not found.");
    error.statusCode = 404;
    throw error;
  }

  return result;
}

// Update a result
export async function updateResult(id, updatedData) {
  const result = await getResultById(id);

  const nextCaScore = updatedData.caScore ?? result.caScore;
  const nextExamScore = updatedData.examScore ?? result.examScore;

  const { totalScore, grade, remark } = calculateGrade(nextCaScore, nextExamScore);

  await result.update({
    caScore: nextCaScore,
    examScore: nextExamScore,
    totalScore,
    grade,
    remark
  });

  return result;
}

// Delete a result
export async function deleteResult(id) {
  const result = await getResultById(id);

  await result.destroy();
}

// Get a student's transcript
export async function getStudentTranscript(studentId) {
  const student = await Student.findByPk(studentId);

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  const results = await Result.findAll({
    where: { studentId },
    include: [{
      model: Subject,
      attributes: ["name", "code"]
    }],
    order: [["session", "ASC"], ["term", "ASC"]]
  });

  return {
    student: {
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      admissionNumber: student.admissionNumber,
      email: student.email
    },
    results
  };
}

// Generate a student's report card
export async function generateReportCard(studentId, term, session, options = {}) {
  const { notify = false } = options;

  const student = await Student.findByPk(studentId);

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  const results = await Result.findAll({
    where: { studentId, term, session },
    include: [{
      model: Subject,
      attributes: ["name", "code"]
    }],
    order: [["createdAt", "ASC"]]
  });

  if (results.length === 0) {
    const error = new Error("No results found for this student in the selected term and session.");
    error.statusCode = 404;
    throw error;
  }

  const totalScore = results.reduce((sum, result) => sum + result.totalScore, 0);
  const average = Number((totalScore / results.length).toFixed(2));

  const reportCard = {
    student: {
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      admissionNumber: student.admissionNumber,
      email: student.email
    },
    term,
    session,
    subjects: results.map(result => ({
      name: result.Subject.name,
      code: result.Subject.code,
      caScore: result.caScore,
      examScore: result.examScore,
      totalScore: result.totalScore,
      grade: result.grade,
      remark: result.remark
    })),
    average,
    subjectCount: results.length
  };

  if (notify) {
    await sendResultNotification({
      to: student.email,
      studentName: `${student.firstName} ${student.lastName}`,
      term,
      session,
      subjects: reportCard.subjects
    });
  }

  return reportCard;
}
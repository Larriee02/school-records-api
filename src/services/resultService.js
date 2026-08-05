
const { Result, Student, Subject } = require('../models');
const calculateGrade = require('../utils/calculateGrade');
const { sendResultNotification } = require('./emailService');

/**
 * Record a new score for a student in a subject for a given term/session.
 */
async function recordResult({ studentId, subjectId, term, session, caScore, examScore }) {
  const existing = await Result.findOne({ where: { studentId, subjectId, term, session } });
  if (existing) {
    const err = new Error('A result already exists for this student/subject/term/session — use update instead');
    err.statusCode = 409;
    throw err;
  }

  const { totalScore, grade, remark } = calculateGrade(caScore, examScore);

  return Result.create({
    studentId,
    subjectId,
    term,
    session,
    caScore,
    examScore,
    totalScore,
    grade,
    remark,
  });
}

async function getResultById(id) {
  const result = await Result.findByPk(id, {
    include: [
      { model: Student, attributes: ['id', 'firstName', 'lastName', 'admissionNumber'] },
      { model: Subject, attributes: ['id', 'name', 'code'] },
    ],
  });
  if (!result) {
    const err = new Error('Result not found');
    err.statusCode = 404;
    throw err;
  }
  return result;
}

/**
 * Update an existing result's scores and recompute grade/remark.
 */
async function updateResult(id, { caScore, examScore }) {
  const result = await getResultById(id);

  const nextCa = caScore ?? result.caScore;
  const nextExam = examScore ?? result.examScore;
  const { totalScore, grade, remark } = calculateGrade(nextCa, nextExam);

  await result.update({ caScore: nextCa, examScore: nextExam, totalScore, grade, remark });
  return result;
}

async function deleteResult(id) {
  const result = await getResultById(id);
  await result.destroy();
  return true;
}

/**
 * Full academic transcript for a student across all sessions.
 */
async function getStudentTranscript(studentId) {
  const student = await Student.findByPk(studentId);
  if (!student) {
    const err = new Error('Student not found');
    err.statusCode = 404;
    throw err;
  }

  const results = await Result.findAll({
    where: { studentId },
    include: [{ model: Subject, attributes: ['name', 'code'] }],
    order: [['session', 'ASC'], ['term', 'ASC']],
  });

  return {
    student: {
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      admissionNumber: student.admissionNumber,
    },
    results,
  };
}

/**
 * Report card for a single student for one term/session, plus
 * (optionally) send an email notification with the summary.
 */
async function generateReportCard(studentId, term, session, { notify = false } = {}) {
  const student = await Student.findByPk(studentId);
  if (!student) {
    const err = new Error('Student not found');
    err.statusCode = 404;
    throw err;
  }

  const results = await Result.findAll({
    where: { studentId, term, session },
    include: [{ model: Subject, attributes: ['name', 'code'] }],
    order: [['createdAt', 'ASC']],
  });

  if (results.length === 0) {
    const err = new Error('No results found for this student in the given term/session');
    err.statusCode = 404;
    throw err;
  }

  const totalScore = results.reduce((sum, r) => sum + r.totalScore, 0);
  const average = Math.round((totalScore / results.length) * 100) / 100;

  const reportCard = {
    student: {
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      admissionNumber: student.admissionNumber,
    },
    term,
    session,
    subjects: results.map((r) => ({
      name: r.Subject.name,
      code: r.Subject.code,
      caScore: r.caScore,
      examScore: r.examScore,
      totalScore: r.totalScore,
      grade: r.grade,
      remark: r.remark,
    })),
    average,
    subjectCount: results.length,
  };

  if (notify) {
    try {
      await sendResultNotification({
        to: student.email,
        studentName: reportCard.student.name,
        term,
        session,
        subjects: reportCard.subjects,
      });
    } catch (e) {
      console.error('[resultService] Result notification email failed:', e.message);
    }
  }

  return reportCard;
}

module.exports = {
  recordResult,
  getResultById,
  updateResult,
  deleteResult,
  getStudentTranscript,
  generateReportCard,
};

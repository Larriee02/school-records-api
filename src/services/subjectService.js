
const { Subject, Teacher, User } = require('../models');

async function createSubject({ name, code, teacherId }) {
  const existing = await Subject.findOne({ where: { code } });
  if (existing) {
    const err = new Error('A subject with this code already exists');
    err.statusCode = 409;
    throw err;
  }
  return Subject.create({ name, code, teacherId: teacherId || null });
}

async function getAllSubjects() {
  return Subject.findAll({
    include: [
      {
        model: Teacher,
        include: [{ model: User, attributes: ['name', 'email'] }],
      },
    ],
    order: [['name', 'ASC']],
  });
}

async function getSubjectById(id) {
  const subject = await Subject.findByPk(id, {
    include: [
      {
        model: Teacher,
        include: [{ model: User, attributes: ['name', 'email'] }],
      },
    ],
  });
  if (!subject) {
    const err = new Error('Subject not found');
    err.statusCode = 404;
    throw err;
  }
  return subject;
}

async function updateSubject(id, updates) {
  const subject = await getSubjectById(id);
  await subject.update(updates);
  return subject;
}

async function deleteSubject(id) {
  const subject = await getSubjectById(id);
  await subject.destroy();
  return true;
}

/**
 * Assign a teacher to teach a subject.
 */
async function assignTeacher(subjectId, teacherId) {
  const subject = await getSubjectById(subjectId);

  const teacher = await Teacher.findByPk(teacherId);
  if (!teacher) {
    const err = new Error('Teacher not found');
    err.statusCode = 404;
    throw err;
  }

  await subject.update({ teacherId });
  return getSubjectById(subjectId);
}

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  assignTeacher,
};

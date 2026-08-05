
const { Teacher, User } = require('../models');
const { sendWelcomeEmail } = require('./emailService');


async function createTeacher({ userId, staffId, department, phone, qualification }) {
  const user = await User.findByPk(userId);
  if (!user) {
    const err = new Error('Linked user account not found');
    err.statusCode = 404;
    throw err;
  }

  const existing = await Teacher.findOne({ where: { userId } });
  if (existing) {
    const err = new Error('This user already has a teacher profile');
    err.statusCode = 409;
    throw err;
  }

  const teacher = await Teacher.create({ userId, staffId, department, phone, qualification });

  
  try {
    await sendWelcomeEmail({ to: user.email, name: user.name, role: 'teacher' });
  } catch (e) {
    console.error('[teacherService] Welcome email failed:', e.message);
  }

  return teacher;
}

async function getAllTeachers({ page = 1, limit = 20 } = {}) {
  const offset = (page - 1) * limit;
  const { rows, count } = await Teacher.findAndCountAll({
    include: [{ model: User, attributes: ['id', 'name', 'email', 'role'] }],
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    data: rows,
    pagination: { total: count, page: Number(page), pages: Math.ceil(count / limit) },
  };
}

async function getTeacherById(id) {
  const teacher = await Teacher.findByPk(id, {
    include: [{ model: User, attributes: ['id', 'name', 'email', 'role'] }],
  });
  if (!teacher) {
    const err = new Error('Teacher not found');
    err.statusCode = 404;
    throw err;
  }
  return teacher;
}

async function updateTeacher(id, updates) {
  const teacher = await getTeacherById(id);
  await teacher.update(updates);
  return teacher;
}

async function deleteTeacher(id) {
  const teacher = await getTeacherById(id);
  await teacher.destroy();
  return true;
}

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};

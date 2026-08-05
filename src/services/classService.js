
const { Class, Student } = require('../models');

async function createClass({ name, arm, capacity }) {
  const existing = await Class.findOne({ where: { name } });
  if (existing) {
    const err = new Error('A class with this name already exists');
    err.statusCode = 409;
    throw err;
  }
  return Class.create({ name, arm, capacity });
}

async function getAllClasses() {
  return Class.findAll({ order: [['name', 'ASC']] });
}

async function getClassById(id) {
  const cls = await Class.findByPk(id);
  if (!cls) {
    const err = new Error('Class not found');
    err.statusCode = 404;
    throw err;
  }
  return cls;
}

async function updateClass(id, updates) {
  const cls = await getClassById(id);
  await cls.update(updates);
  return cls;
}

async function deleteClass(id) {
  const cls = await getClassById(id);
  const studentCount = await Student.count({ where: { classId: id } });
  if (studentCount > 0) {
    const err = new Error('Cannot delete a class that still has students assigned to it');
    err.statusCode = 400;
    throw err;
  }
  await cls.destroy();
  return true;
}

/**
 * View all students currently enrolled in a class.
 */
async function getStudentsInClass(id) {
  await getClassById(id); // ensures class exists
  return Student.findAll({
    where: { classId: id },
    attributes: ['id', 'admissionNumber', 'firstName', 'lastName'],
    order: [['lastName', 'ASC']],
  });
}

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  getStudentsInClass,
};

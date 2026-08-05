
const teacherService = require('../services/teacherService');

exports.createTeacher = async (req, res, next) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json({ success: true, message: 'Teacher created successfully', data: teacher });
  } catch (err) {
    next(err);
  }
};

exports.getAllTeachers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await teacherService.getAllTeachers({ page: Number(page) || 1, limit: Number(limit) || 20 });
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

exports.getTeacherById = async (req, res, next) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.id);
    res.status(200).json({ success: true, data: teacher });
  } catch (err) {
    next(err);
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    const teacher = await teacherService.updateTeacher(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Teacher updated successfully', data: teacher });
  } catch (err) {
    next(err);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    await teacherService.deleteTeacher(req.params.id);
    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (err) {
    next(err);
  }
};

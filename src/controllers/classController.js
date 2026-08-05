
const classService = require('../services/classService');

exports.createClass = async (req, res, next) => {
  try {
    const cls = await classService.createClass(req.body);
    res.status(201).json({ success: true, message: 'Class created successfully', data: cls });
  } catch (err) {
    next(err);
  }
};

exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await classService.getAllClasses();
    res.status(200).json({ success: true, count: classes.length, data: classes });
  } catch (err) {
    next(err);
  }
};

exports.getClassById = async (req, res, next) => {
  try {
    const cls = await classService.getClassById(req.params.id);
    res.status(200).json({ success: true, data: cls });
  } catch (err) {
    next(err);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const cls = await classService.updateClass(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Class updated successfully', data: cls });
  } catch (err) {
    next(err);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    await classService.deleteClass(req.params.id);
    res.status(200).json({ success: true, message: 'Class deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getStudentsInClass = async (req, res, next) => {
  try {
    const students = await classService.getStudentsInClass(req.params.id);
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (err) {
    next(err);
  }
};

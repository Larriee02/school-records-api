
const subjectService = require('../services/subjectService');

exports.createSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json({ success: true, message: 'Subject created successfully', data: subject });
  } catch (err) {
    next(err);
  }
};

exports.getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json({ success: true, count: subjects.length, data: subjects });
  } catch (err) {
    next(err);
  }
};

exports.getSubjectById = async (req, res, next) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    res.status(200).json({ success: true, data: subject });
  } catch (err) {
    next(err);
  }
};

exports.updateSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.updateSubject(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Subject updated successfully', data: subject });
  } catch (err) {
    next(err);
  }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.status(200).json({ success: true, message: 'Subject deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.assignTeacher = async (req, res, next) => {
  try {
    const subject = await subjectService.assignTeacher(req.params.id, req.body.teacherId);
    res.status(200).json({ success: true, message: 'Teacher assigned to subject successfully', data: subject });
  } catch (err) {
    next(err);
  }
};

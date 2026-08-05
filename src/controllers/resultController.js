
const resultService = require('../services/resultService');

exports.recordResult = async (req, res, next) => {
  try {
    const result = await resultService.recordResult(req.body);
    res.status(201).json({ success: true, message: 'Result recorded successfully', data: result });
  } catch (err) {
    next(err);
  }
};

exports.getResultById = async (req, res, next) => {
  try {
    const result = await resultService.getResultById(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.updateResult = async (req, res, next) => {
  try {
    const result = await resultService.updateResult(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Result updated successfully', data: result });
  } catch (err) {
    next(err);
  }
};

exports.deleteResult = async (req, res, next) => {
  try {
    await resultService.deleteResult(req.params.id);
    res.status(200).json({ success: true, message: 'Result deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getStudentTranscript = async (req, res, next) => {
  try {
    const transcript = await resultService.getStudentTranscript(req.params.studentId);
    res.status(200).json({ success: true, data: transcript });
  } catch (err) {
    next(err);
  }
};

exports.generateReportCard = async (req, res, next) => {
  try {
    const { studentId, term, session } = req.params;
    const notify = req.query.notify === 'true';
    const reportCard = await resultService.generateReportCard(studentId, term, session, { notify });
    res.status(200).json({ success: true, data: reportCard });
  } catch (err) {
    next(err);
  }
};

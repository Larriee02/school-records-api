
const { body, param, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

exports.recordResultRules = [
  body('studentId').isUUID().withMessage('A valid studentId is required'),
  body('subjectId').isUUID().withMessage('A valid subjectId is required'),
  body('term').isIn(['First Term', 'Second Term', 'Third Term']).withMessage('Invalid term'),
  body('session').matches(/^\d{4}\/\d{4}$/).withMessage('Session must be in the format YYYY/YYYY'),
  body('caScore').isFloat({ min: 0, max: 40 }).withMessage('caScore must be between 0 and 40'),
  body('examScore').isFloat({ min: 0, max: 60 }).withMessage('examScore must be between 0 and 60'),
  handleValidation,
];

exports.updateResultRules = [
  param('id').isUUID().withMessage('Invalid result id'),
  body('caScore').optional().isFloat({ min: 0, max: 40 }).withMessage('caScore must be between 0 and 40'),
  body('examScore').optional().isFloat({ min: 0, max: 60 }).withMessage('examScore must be between 0 and 60'),
  handleValidation,
];

exports.idParamRule = [
  param('id').isUUID().withMessage('Invalid result id'),
  handleValidation,
];

exports.transcriptParamRule = [
  param('studentId').isUUID().withMessage('Invalid studentId'),
  handleValidation,
];

exports.reportCardParamRule = [
  param('studentId').isUUID().withMessage('Invalid studentId'),
  param('term').isIn(['First Term', 'Second Term', 'Third Term']).withMessage('Invalid term'),
  param('session').matches(/^\d{4}\/\d{4}$/).withMessage('Session must be in the format YYYY/YYYY'),
  handleValidation,
];


const { body, param, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

exports.createSubjectRules = [
  body('name').trim().notEmpty().withMessage('Subject name is required'),
  body('code').trim().notEmpty().withMessage('Subject code is required'),
  body('teacherId').optional().isUUID().withMessage('Invalid teacherId'),
  handleValidation,
];

exports.updateSubjectRules = [
  param('id').isUUID().withMessage('Invalid subject id'),
  body('name').optional().trim().notEmpty(),
  body('code').optional().trim().notEmpty(),
  handleValidation,
];

exports.assignTeacherRules = [
  param('id').isUUID().withMessage('Invalid subject id'),
  body('teacherId').isUUID().withMessage('A valid teacherId is required'),
  handleValidation,
];

exports.idParamRule = [
  param('id').isUUID().withMessage('Invalid subject id'),
  handleValidation,
];

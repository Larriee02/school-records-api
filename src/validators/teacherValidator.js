
const { body, param, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

exports.createTeacherRules = [
  body('userId').isUUID().withMessage('A valid userId is required'),
  body('staffId').trim().notEmpty().withMessage('staffId is required'),
  body('department').optional().isString(),
  body('phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
  body('qualification').optional().isString(),
  handleValidation,
];

exports.updateTeacherRules = [
  param('id').isUUID().withMessage('Invalid teacher id'),
  body('staffId').optional().trim().notEmpty(),
  body('department').optional().isString(),
  body('phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
  body('qualification').optional().isString(),
  handleValidation,
];

exports.idParamRule = [
  param('id').isUUID().withMessage('Invalid teacher id'),
  handleValidation,
];

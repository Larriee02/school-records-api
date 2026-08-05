
const { body, param, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

exports.createClassRules = [
  body('name').trim().notEmpty().withMessage('Class name is required'),
  body('arm').optional().isString(),
  body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive number'),
  handleValidation,
];

exports.updateClassRules = [
  param('id').isUUID().withMessage('Invalid class id'),
  body('name').optional().trim().notEmpty(),
  body('arm').optional().isString(),
  body('capacity').optional().isInt({ min: 1 }),
  handleValidation,
];

exports.idParamRule = [
  param('id').isUUID().withMessage('Invalid class id'),
  handleValidation,
];

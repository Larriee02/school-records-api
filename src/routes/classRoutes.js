
const express = require('express');
const router = express.Router();

const classController = require('../controllers/classController');
const { createClassRules, updateClassRules, idParamRule } = require('../validators/classValidator');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'teacher'), classController.getAllClasses)
  .post(authorize('admin'), createClassRules, classController.createClass);

router
  .route('/:id')
  .get(authorize('admin', 'teacher'), idParamRule, classController.getClassById)
  .put(authorize('admin'), updateClassRules, classController.updateClass)
  .delete(authorize('admin'), idParamRule, classController.deleteClass);

router.get('/:id/students', authorize('admin', 'teacher'), idParamRule, classController.getStudentsInClass);

module.exports = router;

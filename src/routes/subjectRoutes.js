
const express = require('express');
const router = express.Router();

const subjectController = require('../controllers/subjectController');
const {
  createSubjectRules,
  updateSubjectRules,
  assignTeacherRules,
  idParamRule,
} = require('../validators/subjectValidator');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'teacher'), subjectController.getAllSubjects)
  .post(authorize('admin'), createSubjectRules, subjectController.createSubject);

router
  .route('/:id')
  .get(authorize('admin', 'teacher'), idParamRule, subjectController.getSubjectById)
  .put(authorize('admin'), updateSubjectRules, subjectController.updateSubject)
  .delete(authorize('admin'), idParamRule, subjectController.deleteSubject);

router.patch(
  '/:id/assign-teacher',
  authorize('admin'),
  assignTeacherRules,
  subjectController.assignTeacher
);

module.exports = router;

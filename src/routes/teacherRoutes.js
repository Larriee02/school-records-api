
const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController');
const { createTeacherRules, updateTeacherRules, idParamRule } = require('../validators/teacherValidator');


const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'teacher'), teacherController.getAllTeachers)
  .post(authorize('admin'), createTeacherRules, teacherController.createTeacher);

router
  .route('/:id')
  .get(authorize('admin', 'teacher'), idParamRule, teacherController.getTeacherById)
  .put(authorize('admin'), updateTeacherRules, teacherController.updateTeacher)
  .delete(authorize('admin'), idParamRule, teacherController.deleteTeacher);

module.exports = router;

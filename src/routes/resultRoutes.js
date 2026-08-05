
const express = require('express');
const router = express.Router();

const resultController = require('../controllers/resultController');
const {
  recordResultRules,
  updateResultRules,
  idParamRule,
  transcriptParamRule,
  reportCardParamRule,
} = require('../validators/resultValidator');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/', authorize('admin', 'teacher'), recordResultRules, resultController.recordResult);

router
  .route('/:id')
  .get(authorize('admin', 'teacher', 'student'), idParamRule, resultController.getResultById)
  .put(authorize('admin', 'teacher'), updateResultRules, resultController.updateResult)
  .delete(authorize('admin'), idParamRule, resultController.deleteResult);

router.get(
  '/transcript/:studentId',
  authorize('admin', 'teacher', 'student'),
  transcriptParamRule,
  resultController.getStudentTranscript
);

router.get(
  '/report-card/:studentId/:term/:session',
  authorize('admin', 'teacher', 'student'),
  reportCardParamRule,
  resultController.generateReportCard
);

module.exports = router;


const GRADE_SCALE = [
  { min: 70, max: 100, grade: 'A1', remark: 'Excellent' },
  { min: 65, max: 69, grade: 'B2', remark: 'Very Good' },
  { min: 60, max: 64, grade: 'B3', remark: 'Good' },
  { min: 55, max: 59, grade: 'C4', remark: 'Credit' },
  { min: 50, max: 54, grade: 'C5', remark: 'Credit' },
  { min: 45, max: 49, grade: 'C6', remark: 'Credit' },
  { min: 40, max: 44, grade: 'D7', remark: 'Pass' },
  { min: 30, max: 39, grade: 'E8', remark: 'Pass' },
  { min: 0, max: 29, grade: 'F9', remark: 'Fail' },
];


function calculateGrade(caScore = 0, examScore = 0) {
  const ca = Number(caScore);
  const exam = Number(examScore);

  if (Number.isNaN(ca) || Number.isNaN(exam)) {
    throw new Error('caScore and examScore must be numbers');
  }

  const totalScore = Math.round((ca + exam) * 100) / 100;
  const band = GRADE_SCALE.find((b) => totalScore >= b.min && totalScore <= b.max) || GRADE_SCALE[GRADE_SCALE.length - 1];

  return { totalScore, grade: band.grade, remark: band.remark };
}

module.exports = calculateGrade;

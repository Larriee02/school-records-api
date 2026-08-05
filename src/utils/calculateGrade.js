const GRADE_SCALE = [
  { min: 70, max: 100, grade: "A", remark: "Excellent" },
  { min: 60, max: 69, grade: "B", remark: "Very Good" },
  { min: 50, max: 59, grade: "C", remark: "Good" },
  { min: 40, max: 49, grade: "D", remark: "Pass" },
  { min: 30, max: 39, grade: "E", remark: "Poor" },
  { min: 0, max: 29, grade: "F", remark: "Fail" }
];

// Calculate total score, grade and remark
export function calculateGrade(caScore = 0, examScore = 0) {
  const ca = Number(caScore);
  const exam = Number(examScore);

  if (Number.isNaN(ca) || Number.isNaN(exam)) {
    throw new Error("CA score and exam score must be numbers.");
  }

  const totalScore = ca + exam;

  const gradeInfo = GRADE_SCALE.find(item => totalScore >= item.min && totalScore <= item.max);

  return {
    totalScore,
    grade: gradeInfo.grade,
    remark: gradeInfo.remark
  };
}
import User from "./userModel.js";
import Teacher from "./teacherModel.js";
import Student from "./studentModel.js";
import schoolClass from "./classModel.js";
import Subject from "./subjectModel.js";
import Attendance from "./attendanceModel.js";
import Result from "./resultModel.js";


// user - teacher relationship 1:1
// One User account belongs to one Teacher
User.hasOne(Teacher, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Teacher.belongsTo(User, {
  foreignKey: "userId",
});


//class - student 1:N
// One Class has many Students
schoolClass.hasMany(Student, {
  foreignKey: "classId",
});

Student.belongsTo(schoolClass, {
  foreignKey: "classId",
});


//teacher - subject 1:N
// One Teacher teaches many Subjects
Teacher.hasMany(Subject, {
  foreignKey: "teacherId",
});

Subject.belongsTo(Teacher, {
  foreignKey: "teacherId",
});


//student - attendance taken 1:N
// One Student has many Attendance records
Student.hasMany(Attendance, {
  foreignKey: "studentId",
});

Attendance.belongsTo(Student, {
  foreignKey: "studentId",
});


//student - results 1:N
// One Student has many Results
Student.hasMany(Result, {
  foreignKey: "studentId",
});

Result.belongsTo(Student, {
  foreignKey: "studentId",
});


//subject - result 1:N
// One Subject has many Results
Subject.hasMany(Result, {
  foreignKey: "subjectId",
});

Result.belongsTo(Subject, {
  foreignKey: "subjectId",
});


export {
  User,
  Teacher,
  Student,
  schoolClass,
  Subject,
  Attendance,
  Result,
};
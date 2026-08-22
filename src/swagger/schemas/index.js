import userSchema from "./userSchema.js";
import studentSchema from "./studentSchema.js";
import teacherSchema from "./teacherSchema.js";
import classSchema from "./classSchema.js";
import subjectSchema from "./subjectSchema.js";
import attendanceSchema from "./attendanceSchema.js";
import resultSchema from "./resultSchema.js";

export default {
  ...userSchema,
  ...studentSchema,
  ...teacherSchema,
  ...classSchema,
  ...subjectSchema,
  ...attendanceSchema,
  ...resultSchema
};
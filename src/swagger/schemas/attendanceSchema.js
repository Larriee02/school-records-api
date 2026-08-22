const attendanceSchema = {
  Attendance: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "4d7e8f21-6a3b-4f9c-b5d2-123456789abc"
      },

      studentId: {
        type: "string",
        format: "uuid",
        example: "1331a0ec-f6a4-4814-9a0f-d42114593cf0"
      },

      date: {
        type: "string",
        format: "date",
        example: "2026-08-06"
      },

      status: {
        type: "string",
        enum: [
          "Present",
          "Absent",
          "Late"
        ],
        example: "Present"
      },

      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-06T08:30:00.000Z"
      },

      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-06T08:30:00.000Z"
      }
    }
  },

  AttendanceWithStudent: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "4d7e8f21-6a3b-4f9c-b5d2-123456789abc"
      },

      studentId: {
        type: "string",
        format: "uuid",
        example: "1331a0ec-f6a4-4814-9a0f-d42114593cf0"
      },

      date: {
        type: "string",
        format: "date",
        example: "2026-08-06"
      },

      status: {
        type: "string",
        enum: [
          "Present",
          "Absent",
          "Late"
        ],
        example: "Present"
      },

      Student: {
        $ref: "#/components/schemas/Student"
      }
    }
  },

  CreateAttendance: {
    type: "object",
    required: [
      "studentId",
      "date",
      "status"
    ],
    properties: {
      studentId: {
        type: "string",
        format: "uuid",
        example: "1331a0ec-f6a4-4814-9a0f-d42114593cf0"
      },

      date: {
        type: "string",
        format: "date",
        example: "2026-08-06"
      },

      status: {
        type: "string",
        enum: [
          "Present",
          "Absent",
          "Late"
        ],
        example: "Present"
      }
    }
  },

  UpdateAttendance: {
    type: "object",
    properties: {
      date: {
        type: "string",
        format: "date",
        example: "2026-08-06"
      },

      status: {
        type: "string",
        enum: [
          "Present",
          "Absent",
          "Late"
        ],
        example: "Late"
      }
    }
  }
};

export default attendanceSchema;
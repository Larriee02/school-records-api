const studentSchema = {
  Student: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "1331a0ec-f6a4-4814-9a0f-d42114593cf0"
      },
      firstName: {
        type: "string",
        example: "John"
      },
      lastName: {
        type: "string",
        example: "Doe"
      },
      gender: {
        type: "string",
        enum: ["Male", "Female"],
        example: "Male"
      },
      dateOfBirth: {
        type: "string",
        format: "date",
        example: "2010-05-12"
      },
      admissionNumber: {
        type: "string",
        example: "FRK001"
      },
      classId: {
        type: "string",
        format: "uuid",
        example: "dd2297d9-e17c-4900-8cef-84e1f5eca9e0"
      },
      email: {
        type: "string",
        format: "email",
        example: "john@example.com"
      },
      createdAt: {
        type: "string",
        format: "date-time"
      },
      updatedAt: {
        type: "string",
        format: "date-time"
      }
    }
  },

  CreateStudent: {
    type: "object",
    required: [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "admissionNumber",
      "classId",
      "email"
    ],
    properties: {
      firstName: {
        type: "string",
        example: "John"
      },
      lastName: {
        type: "string",
        example: "Doe"
      },
      gender: {
        type: "string",
        enum: ["Male", "Female"],
        example: "Male"
      },
      dateOfBirth: {
        type: "string",
        format: "date",
        example: "2010-05-12"
      },
      admissionNumber: {
        type: "string",
        example: "FRK001"
      },
      classId: {
        type: "string",
        format: "uuid",
        example: "dd2297d9-e17c-4900-8cef-84e1f5eca9e0"
      },
      email: {
        type: "string",
        format: "email",
        example: "john@example.com"
      }
    }
  },

  UpdateStudent: {
    type: "object",
    properties: {
      firstName: {
        type: "string",
        example: "John"
      },
      lastName: {
        type: "string",
        example: "Doe"
      },
      gender: {
        type: "string",
        enum: ["Male", "Female"],
        example: "Male"
      },
      dateOfBirth: {
        type: "string",
        format: "date",
        example: "2010-05-12"
      },
      classId: {
        type: "string",
        format: "uuid",
        example: "dd2297d9-e17c-4900-8cef-84e1f5eca9e0"
      },
      email: {
        type: "string",
        format: "email",
        example: "john.updated@example.com"
      }
    }
  }
};

export default studentSchema;
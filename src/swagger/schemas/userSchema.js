const userSchema = {
  User: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "a4675bd5-3f77-423a-94ab-985dcfcb2a99"
      },

      firstName: {
        type: "string",
        example: "Jane"
      },

      lastName: {
        type: "string",
        example: "Smith"
      },

      email: {
        type: "string",
        format: "email",
        example: "jane.smith@example.com"
      },

      role: {
        type: "string",
        enum: [
          "admin",
          "teacher",
          "student"
        ],
        example: "teacher"
      }
    }
  }
};

export default userSchema;
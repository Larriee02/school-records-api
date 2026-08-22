const classSchema = {
  SchoolClass: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "dd2297d9-e17c-4900-8cef-84e1f5eca9e0"
      },
      className: {
        type: "string",
        example: "Form 5 Science"
      },
      level: {
        type: "string",
        example: "Form 5"
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

  CreateClass: {
    type: "object",
    required: ["className", "level"],
    properties: {
      className: {
        type: "string",
        example: "Form 5 Science"
      },
      level: {
        type: "string",
        example: "Form 5"
      }
    }
  },

  UpdateClass: {
    type: "object",
    properties: {
      className: {
        type: "string",
        example: "Form 5 Science"
      },
      level: {
        type: "string",
        example: "Form 5"
      }
    }
  }
};

export default classSchema;
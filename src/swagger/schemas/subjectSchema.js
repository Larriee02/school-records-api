const subjectSchema = {
  Subject: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "7b6f2d3e-4c8a-4f7d-9e21-123456789abc"
      },

      name: {
        type: "string",
        example: "Mathematics"
      },

      code: {
        type: "string",
        example: "MATH"
      },

      teacherId: {
        type: "string",
        format: "uuid",
        nullable: true,
        example: "fd00673d-8d02-443b-8d97-7bf11eb318eb"
      },

      createdAt: {
        type: "string",
        format: "date-time"
      },

      updatedAt: {
        type: "string",
        format: "date-time"
      },

      Teacher: {
        $ref: "#/components/schemas/Teacher"
      }
    }
  },

  CreateSubject: {
    type: "object",
    required: ["name", "code"],
    properties: {
      name: {
        type: "string",
        example: "Mathematics"
      },

      code: {
        type: "string",
        example: "MATH"
      },

      teacherId: {
        type: "string",
        format: "uuid",
        nullable: true,
        example: "fd00673d-8d02-443b-8d97-7bf11eb318eb"
      }
    }
  },

  UpdateSubject: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Advanced Mathematics"
      },

      code: {
        type: "string",
        example: "AMATH"
      },

      teacherId: {
        type: "string",
        format: "uuid",
        nullable: true,
        example: "fd00673d-8d02-443b-8d97-7bf11eb318eb"
      }
    }
  },

  AssignTeacher: {
    type: "object",
    required: ["teacherId"],
    properties: {
      teacherId: {
        type: "string",
        format: "uuid",
        example: "fd00673d-8d02-443b-8d97-7bf11eb318eb"
      }
    }
  }
};

export default subjectSchema;
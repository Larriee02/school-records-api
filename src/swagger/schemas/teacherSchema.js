const teacherSchema = {
  Teacher: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "fd00673d-8d02-443b-8d97-7bf11eb318eb"
      },

      userId: {
        type: "string",
        format: "uuid",
        example: "a4675bd5-3f77-423a-94ab-985dcfcb2a99"
      },

      staffId: {
        type: "string",
        example: "TCH002"
      },

      department: {
        type: "string",
        example: "Computer Science"
      },

      phone: {
        type: "string",
        example: "677123457"
      },

      qualification: {
        type: "string",
        example: "B.Sc Computer Science"
      },

      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-06T07:47:53.097Z"
      },

      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-06T07:47:53.097Z"
      },

      User: {
        $ref: "#/components/schemas/User"
      }
    }
  },

  CreateTeacher: {
    type: "object",
    required: [
      "userId",
      "staffId",
      "department",
      "phone",
      "qualification"
    ],
    properties: {
      userId: {
        type: "string",
        format: "uuid",
        example: "a4675bd5-3f77-423a-94ab-985dcfcb2a99"
      },

      staffId: {
        type: "string",
        example: "TCH002"
      },

      department: {
        type: "string",
        example: "Computer Science"
      },

      phone: {
        type: "string",
        example: "677123457"
      },

      qualification: {
        type: "string",
        example: "B.Sc Computer Science"
      }
    }
  },

  UpdateTeacher: {
    type: "object",
    properties: {
      staffId: {
        type: "string",
        example: "TCH003"
      },

      department: {
        type: "string",
        example: "Mathematics"
      },

      phone: {
        type: "string",
        example: "677123458"
      },

      qualification: {
        type: "string",
        example: "B.Ed Mathematics"
      }
    }
  }
};

export default teacherSchema;
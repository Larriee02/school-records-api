const resultSchema = {
  Result: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "7f4d3e21-6a3b-4f9c-b5d2-123456789abc"
      },

      studentId: {
        type: "string",
        format: "uuid",
        example: "1331a0ec-f6a4-4814-9a0f-d42114593cf0"
      },

      subjectId: {
        type: "string",
        format: "uuid",
        example: "9a7b6c5d-4e3f-2a1b-8c7d-654321abcdef"
      },

      term: {
        type: "string",
        enum: [
          "First Term",
          "Second Term",
          "Third Term"
        ],
        example: "First Term"
      },

      session: {
        type: "string",
        pattern: "^\\d{4}/\\d{4}$",
        example: "2025/2026"
      },

      caScore: {
        type: "number",
        format: "float",
        minimum: 0,
        maximum: 40,
        example: 32
      },

      examScore: {
        type: "number",
        format: "float",
        minimum: 0,
        maximum: 60,
        example: 52
      },

      totalScore: {
        type: "number",
        format: "float",
        minimum: 0,
        maximum: 100,
        example: 84
      },

      grade: {
        type: "string",
        enum: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        example: "A"
      },

      remark: {
        type: "string",
        enum: [
          "Excellent",
          "Very Good",
          "Good",
          "Pass",
          "Poor",
          "Fail"
        ],
        example: "Excellent"
      },

      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-06T10:30:00.000Z"
      },

      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-06T10:30:00.000Z"
      }
    }
  },

  CreateResult: {
    type: "object",
    required: [
      "studentId",
      "subjectId",
      "term",
      "session",
      "caScore",
      "examScore"
    ],
    properties: {
      studentId: {
        type: "string",
        format: "uuid",
        example: "1331a0ec-f6a4-4814-9a0f-d42114593cf0"
      },

      subjectId: {
        type: "string",
        format: "uuid",
        example: "9a7b6c5d-4e3f-2a1b-8c7d-654321abcdef"
      },

      term: {
        type: "string",
        enum: [
          "First Term",
          "Second Term",
          "Third Term"
        ],
        example: "First Term"
      },

      session: {
        type: "string",
        pattern: "^\\d{4}/\\d{4}$",
        example: "2025/2026"
      },

      caScore: {
        type: "number",
        format: "float",
        minimum: 0,
        maximum: 40,
        example: 32
      },

      examScore: {
        type: "number",
        format: "float",
        minimum: 0,
        maximum: 60,
        example: 52
      }
    }
  },

  UpdateResult: {
    type: "object",
    properties: {
      caScore: {
        type: "number",
        format: "float",
        minimum: 0,
        maximum: 40,
        example: 35
      },

      examScore: {
        type: "number",
        format: "float",
        minimum: 0,
        maximum: 60,
        example: 55
      }
    }
  },

  StudentTranscript: {
    type: "object",
    properties: {
      student: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid"
          },
          name: {
            type: "string",
            example: "John Doe"
          },
          admissionNumber: {
            type: "string",
            example: "FRK001"
          },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com"
          }
        }
      },

      results: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            term: {
              type: "string",
              example: "First Term"
            },
            session: {
              type: "string",
              example: "2025/2026"
            },
            caScore: {
              type: "number",
              example: 32
            },
            examScore: {
              type: "number",
              example: 52
            },
            totalScore: {
              type: "number",
              example: 84
            },
            grade: {
              type: "string",
              example: "A"
            },
            remark: {
              type: "string",
              example: "Excellent"
            },
            Subject: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Mathematics"
                },
                code: {
                  type: "string",
                  example: "MATH101"
                }
              }
            }
          }
        }
      }
    }
  },

  ReportCard: {
    type: "object",
    properties: {
      student: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid"
          },
          name: {
            type: "string",
            example: "John Doe"
          },
          admissionNumber: {
            type: "string",
            example: "FRK001"
          },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com"
          }
        }
      },

      term: {
        type: "string",
        example: "First Term"
      },

      session: {
        type: "string",
        example: "2025/2026"
      },

      subjects: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Mathematics"
            },
            code: {
              type: "string",
              example: "MATH101"
            },
            caScore: {
              type: "number",
              example: 32
            },
            examScore: {
              type: "number",
              example: 52
            },
            totalScore: {
              type: "number",
              example: 84
            },
            grade: {
              type: "string",
              example: "A"
            },
            remark: {
              type: "string",
              example: "Excellent"
            }
          }
        }
      },

      average: {
        type: "number",
        example: 78.5
      },

      subjectCount: {
        type: "integer",
        example: 8
      }
    }
  }
};

export default resultSchema;
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Result = sequelize.define(
  "Result",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    term: {
      type: DataTypes.ENUM("First Term", "Second Term", "Third Term"),
      allowNull: false
    },

    session: {
      type: DataTypes.STRING,
      allowNull: false
    },

    caScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 40
      }
    },

    examScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 60
      }
    },

    totalScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    },

    grade: {
      type: DataTypes.ENUM("A", "B", "C", "D", "E", "F"),
      allowNull: false
    },

    remark: {
      type: DataTypes.ENUM(
          "Excellent",
          "Very Good",
          "Good",
          "Pass",
          "Poor",
          "Fail"
      ),
      allowNull: false
    }
  },
    {
      tableName: "results",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["studentId", "subjectId", "term", "session"]
        }
      ]
  }
);

export default Result;
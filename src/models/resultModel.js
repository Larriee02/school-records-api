import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Result = sequelize.define(
  "Result",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },

    grade: {
      type: DataTypes.ENUM("A", "B", "C", "D", "E", "F"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Result;
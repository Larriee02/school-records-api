import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Subject = sequelize.define(
  "Subject",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    teacherId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "subjects",
    timestamps: true,
  }
);

export default Subject;
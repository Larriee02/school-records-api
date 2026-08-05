import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"

const Subject = sequelize.define(
  "Subject",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    subjectCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
  },
  {
    tableName: "subjects",
    timestamps: true,
  }
);

export default Subject;
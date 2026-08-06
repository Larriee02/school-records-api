import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Teacher = sequelize.define(
  "Teacher",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    staffId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    qualification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "teachers",
    timestamps: true,
  }
);

export default Teacher;
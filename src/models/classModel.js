import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SchoolClass = sequelize.define(
  "SchoolClass",
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

    arm: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
  },
  {
    tableName: "classes",
    timestamps: true,
  }
);

export default SchoolClass;
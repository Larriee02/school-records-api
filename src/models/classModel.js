import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"

const schoolClass = sequelize.define(
  "schoolClass",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    className: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    tableName: "classes",
    timestamps: true,
  }
);

export default schoolClass;
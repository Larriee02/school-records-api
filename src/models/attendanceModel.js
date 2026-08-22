import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Present", "Absent", "Late"),
      allowNull: false,
    },
  },
  {
    tableName: "attendance",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["studentId", "date"],
      },
    ],
  }
);

export default Attendance;

//*To prevent duplicate attendance records for the same student on the same day, we add a composite unique constraint: indexes
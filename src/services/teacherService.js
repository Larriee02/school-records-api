import { Teacher, User } from "../models/index.js";
import { sendWelcomeEmail } from "./emailService.js";

// Create a teacher profile
export async function createTeacher(teacherData) {
  const { userId, staffId, department, phone, qualification } = teacherData;

  // Ensure the linked user exists
  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error("Linked user account not found.");
    error.statusCode = 404;
    throw error;
  }

  // Ensure the linked user has the Teacher role
  if (user.role !== "teacher") {
    const error = new Error("The selected user is not assigned the Teacher role.");
    error.statusCode = 400;
    throw error;
  }

  // Prevent duplicate teacher profiles
  const existingTeacher = await Teacher.findOne({ where: { userId } });

  if (existingTeacher) {
    const error = new Error("This user already has a teacher profile.");
    error.statusCode = 409;
    throw error;
  }

  const teacher = await Teacher.create({
    userId,
    staffId,
    department,
    phone,
    qualification
  });

  // Send welcome email (doesn't stop profile creation if it fails)
  try {
    await sendWelcomeEmail({
      to: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: "Teacher"
    });
  } catch (emailError) {
    console.error("[Teacher Service] Welcome email failed:", emailError.message);
  }

  return teacher;
}

// Get all teachers
export async function getAllTeachers({ page = 1, limit = 20 } = {}) {
  const offset = (page - 1) * limit;

  const { rows, count } = await Teacher.findAndCountAll({
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "role"]
      }
    ],
    limit,
    offset,
    order: [["createdAt", "DESC"]]
  });

  return {
    data: rows,
    pagination: {
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit)
    }
  };
}

// Get teacher by ID - use id of profile created
export async function getTeacherById(id) {
  const teacher = await Teacher.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email", "role"]
      }
    ]
  });

  if (!teacher) {
    const error = new Error("Teacher not found.");
    error.statusCode = 404;
    throw error;
  }

  return teacher;
}

// Update teacher
export async function updateTeacher(id, updatedData) {
  const teacher = await getTeacherById(id);

  await teacher.update(updatedData);

  return teacher;
}

// Delete teacher
export async function deleteTeacher(id) {
  const teacher = await getTeacherById(id);

  await teacher.destroy();
}
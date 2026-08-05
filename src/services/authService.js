import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js"
import { generateToken } from "../utils/generateToken.js";
import { Sequelize } from "sequelize";

//*Register a new user
export async function registerUser(userData) {

  const { firstName, lastName, email, password, role } = userData

  // Check if email already exists
  const existingUser = await User.findOne({ where: { email }})

  if (existingUser) {
    throw new Error("Email already exists.")
  }

  // Hash password
  const hashedPassword = await hashPassword(password)

  // Create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  })

  // Generate JWT
  const token = generateToken(newUser)

//we can use sequeslize toJSON instead of manually selecting fields so we get all fields without forgetting any and remove password from the response
  const userResponse = newUser.toJSON()
  delete userResponse.password

    return {
        user: userResponse,
        token
    }
}

//*Login an existing user
export async function loginUser(loginData) {

  const { email, password } = loginData;

  // Find user by email
  const user = await User.findOne({ where: { email }});

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Compare passwords
  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password.");
  }

  // Generate JWT
  const token = generateToken(user);

  const userResponse = user.toJSON()
  delete userResponse.password

    return {
        user: userResponse,
        token
    }
}
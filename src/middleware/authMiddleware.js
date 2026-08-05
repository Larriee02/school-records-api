
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Verify JWT before allowing access to protected routes
export const authenticateUser = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Expected format: Bearer <token>
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
    return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
    });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

//*Note:Authentication tells us who the user is
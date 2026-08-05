import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import sequelize from "./config/database.js";
import "./models/index.js";
import Routes from "./routes/index.js"

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({message: "Welcome to School Record Management API V1"});
});

app.use("/api/v1", Routes)

//error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Create tables (development only)
    await sequelize.sync({ alter: true });
    console.log("Models synchronized.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database.");
    console.error(error.message);
  }
}

startServer();
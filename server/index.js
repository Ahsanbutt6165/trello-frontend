import express from "express";
import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import connectToMongo from "./database/db.js";
import CardRoutes from "./routes/CardRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/card", CardRoutes);

// const __dirname = path.resolve("/Users/hp/Desktop/New folder");
// app.use(express.static(path.join(__dirname, "/vite-project/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "vite-project", "dist", "index.html"));
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Both frontend and backend running on http://localhost:${PORT}`);
});

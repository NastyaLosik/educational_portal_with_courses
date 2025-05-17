import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import path from "path";
import { authRoutes } from "./routes/authRoutes";
import { courseRoutes } from "./routes/courseRoutes";
import { favoriteRoutes } from "./routes/favoriteRoutes";

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

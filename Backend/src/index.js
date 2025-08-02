import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./connectMongoDbURL.js";
import authRoues from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

connectToMongoDB(process.env.MONGODB_URL);

const PORT = process.env.PORT || 3001;

// Creating server.
const app = express();

const allowOrigins = [
  "http://localhost:5173",
  "https://decodedev.fun",
  "https://www.decodedev.fun",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("✅ Backend Root Route Working!");
});

app.use("/api/auth", authRoues);
app.use("/api/notes", noteRoutes);

app.get("/api/auth/test", (req, res) => {
  res.send("Auth route working!");
});

app.listen(PORT, () => {
  console.log(`Server is running at the port: ${PORT}`);
});

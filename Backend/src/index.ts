import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectToMongoDB } from "./connectMongoDbURL";

dotenv.config();

const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  throw new Error("MONGODB_URL environment variable is not set.");
}
connectToMongoDB(mongoUrl);

const PORT = process.env.PORT || 3001;

// Creating server.
const app = express();

const allowOrigins = [
  "http://localhost:5173",
  "https://note-taking-app-hazel-sigma.vercel.app",
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

// app.use();

app.listen(PORT, () => {
  console.log(`Server is running at the port: ${PORT}`);
});

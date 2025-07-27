import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectToMongoDB } from "./connectMongoDbURL.js";

dotenv.config();

connectToMongoDB(process.env.MONGODB_URL);

// Creating server.
const app = express();

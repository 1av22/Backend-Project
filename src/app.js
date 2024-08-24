// Importing all the packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Creating the express app
const app = express();

// Setting up all the middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Exporting the application
export { app };

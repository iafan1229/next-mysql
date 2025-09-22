import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import subRoutes from "./routes/subs";
import postRoutes from "./routes/post";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const origin = "http://localhost:3000";
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));

//라우터
app.use("/api/auth", authRoutes);
app.use("/api/subs", subRoutes);
app.use("/api/posts", postRoutes);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

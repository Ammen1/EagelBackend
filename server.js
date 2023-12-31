import path from "path";

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";

import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import cookieParser, { signedCookie } from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobSeekerRouters from "./routes/jobSeekerRoutes.js";
import addressRouters from "./routes/addressRoutes.js";
import categoryRouters from "./routes/categoryRoutes.js";
import jobTypeRouters from "./routes/jobTypeRouter.js";
import jobRouters from "./routes/jobRouter.js";
import jobimageRouters from "./routes/jobImageRouter.js";
import companyRouters from "./routes/companyRouter.js";
import companyUserProfileRouter from "./routes/companyUserProfileRouter.js";
import jobApplicationRouter from "./routes/jobApplicationRouter.js";
import feedbackRouter from "./routes/feedbackRouter.js";
import messageRouter from "./routes/messageRouter.js";
import notificationRouter from "./routes/notificationRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();
/** middlewares */
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/jobseekers", jobSeekerRouters);
app.use("/api/address", addressRouters);
app.use("/api/category", categoryRouters);
app.use("/api/jobtype", jobTypeRouters);
app.use("/api/job", jobRouters);
app.use("/api/jobimage", jobimageRouters);
app.use("/api/company", companyRouters);
app.use("/api/companyuserprofile", companyUserProfileRouter);
app.use("/api/jobapplication", jobApplicationRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/message", messageRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/review", reviewRouter);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server is Runnign on port ${port}`));

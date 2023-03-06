import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import cores from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import workSpaceRoute from "./routes/workSpace.js";
import adminRoute from "./routes/admin.js";
import { globalErrorHandling } from "./middleware/errorHandling.js";
import connectToDB from "./config/db.js";
import connecToPort from "./config/server.js";

dotenv.config({ path: "./config.env" });
const app = express();
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cores());

/**
 * Connect to database
 */
connectToDB();

/**
 * Route setup
 */
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/workspace", workSpaceRoute);

/**
 * Connect to port
 */
connecToPort(app);

/**
 * Global error handling middleware
 */
app.use(globalErrorHandling);

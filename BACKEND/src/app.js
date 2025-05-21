import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors());
app.use(
  express.json({
    limit: "16kb"
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb"
  })
);
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/captian", captianRouter);
export default app;

import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

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

app.use("/user", userRouter);
export default app;

import { Router } from "express";
const router = Router();
import { login } from "../controller/captian.controller.js";

router.get("/login", login);

export default router;

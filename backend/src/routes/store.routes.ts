import express from "express";
import verifyToken from "../middleware/auth.middleware";
import { registerStore } from "../controllers/store.controller";

const router = express.Router();

router.post("/register-store", verifyToken, registerStore);

export default router;
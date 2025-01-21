import express from "express";
import { paymentHandler } from "../controllers/payment.controller";

const router = express.Router();

router.post("/checkout", paymentHandler);

export default router;
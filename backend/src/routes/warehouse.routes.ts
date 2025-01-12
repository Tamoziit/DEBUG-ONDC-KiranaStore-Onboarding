import express from "express";
import verifyAdmin from "../middleware/admin.middleware";
import { createWarehouse } from "../controllers/warehouse.controller";

const router = express.Router();

router.post("/create-warehouse", verifyAdmin, createWarehouse);

export default router;
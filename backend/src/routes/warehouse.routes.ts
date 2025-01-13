import express from "express";
import verifyAdmin from "../middleware/admin.middleware";
import { createWarehouse, getWarehouses, listSimilarItems, processOrder } from "../controllers/warehouse.controller";
import verifyToken from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create-warehouse", verifyAdmin, createWarehouse);
router.post("/search-items", verifyToken, listSimilarItems);
router.post("/process-order", verifyToken, processOrder);
router.get("/get-warehouses", verifyToken, getWarehouses);

export default router;
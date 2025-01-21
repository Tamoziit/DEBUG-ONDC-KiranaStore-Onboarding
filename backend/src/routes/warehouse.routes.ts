import express from "express";
import verifyAdmin from "../middleware/admin.middleware";
import { createWarehouse, getProductsFromLatestWarehouses, getWarehouses, listSimilarItems, processOrder } from "../controllers/warehouse.controller";
import verifyToken from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create-warehouse", verifyAdmin, createWarehouse);
router.get("/search-items", listSimilarItems);
router.post("/process-order", processOrder);
router.get("/get-warehouses", verifyToken, getWarehouses);
router.get("/explore/latest", getProductsFromLatestWarehouses);

export default router;
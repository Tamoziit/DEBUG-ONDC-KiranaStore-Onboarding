import express from "express";
import verifyToken from "../middleware/auth.middleware";
import { getMyStores, getStoreById, registerStore } from "../controllers/store.controller";
import { getWarehouseById } from "../controllers/warehouse.controller";

const router = express.Router();

router.post("/register-store", verifyToken, registerStore);
router.get("/my-stores", verifyToken, getMyStores);
router.get("/:id", verifyToken, getStoreById);
router.get("/my-warehouse/:id", verifyToken, getWarehouseById);

export default router;
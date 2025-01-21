import express from "express";
import verifyToken from "../middleware/auth.middleware";
import { getMyStores, getStoreById, registerStore, updateInventory } from "../controllers/store.controller";
import { getWarehouseById } from "../controllers/warehouse.controller";

const router = express.Router();

router.post("/register-store", verifyToken, registerStore);
router.get("/my-stores", verifyToken, getMyStores);
router.post("/my-stores/update-inventory/:id", verifyToken, updateInventory);
router.get("/:id", verifyToken, getStoreById);
router.get("/my-warehouse/:id", verifyToken, getWarehouseById);

export default router;
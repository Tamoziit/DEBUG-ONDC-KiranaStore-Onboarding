import { Request, Response } from "express";
import { StoreRequestBody, User } from "../types/types";
import Warehouse from "../models/warehouse.model";
import Store from "../models/store.model";
import UserModel from "../models/user.model";

interface CustomRequest extends Request {
    user?: User;
    body: StoreRequestBody;
}

export const registerStore = async (req: CustomRequest, res: Response) => {
    try {
        const {
            name,
            gstNo,
            address,
            contactNo,
            warehouseId,
            inventory
        } = req.body;
        const owner = req.user?._id;

        if (contactNo.length !== 10) {
            res.status(400).json({ error: "Enter a valid Phone no." });
            return;
        }
        if (name.length < 2) {
            res.status(400).json({ error: "Store Name should be at least 2 characters long" });
            return;
        }
        if (!Array.isArray(inventory) || inventory.length < 1) {
            res.status(400).json({ error: "At least 1 item should be added to the inventory" });
            return;
        }

        const storeAlreadyExists = await Store.findOne({ gstNo });
        if (storeAlreadyExists) {
            res.status(400).json({ error: "A Store with this GST No. is already registered" });
            return;
        }

        const warehouse = await Warehouse.findById(warehouseId);
        if (!warehouse) {
            res.status(400).json({ error: "No such warehouse found" });
            return;
        }

        const newStore = new Store({
            name,
            owner,
            gstNo,
            address,
            contactNo,
            warehouseId,
            warehouseCode: warehouse.code,
            inventory
        });

        if (newStore) {
            await newStore.save();

            // Warehouse updates
            warehouse.registeredStores.push(newStore._id);
            let totalInventoryCost = 0;
            inventory.forEach(item => {
                totalInventoryCost += item.quantity * item.costPerItem;
            });
            warehouse.inventoryCost += totalInventoryCost;
            await warehouse.save();

            const user = await UserModel.findById(owner);
            user?.stores.push(newStore._id);
            await user?.save();

            res.status(201).json(newStore);
        } else {
            res.status(400).json({ error: "Enter valid Store data" });
        }
    } catch (error) {
        console.error("Error in Store registration controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyStores = async (req: Request, res: Response) => {
    try {
        const storeIds = req.user?.stores;
        if (!storeIds || storeIds.length === 0) {
            res.status(400).json({ error: "No stores registered" });
            return;
        }

        const storePromises = storeIds.map((storeId) => Store.findById(storeId));
        const stores = await Promise.all(storePromises);

        const filteredStores = stores.filter((store) => store !== null);

        if (filteredStores.length === 0) {
            res.status(400).json({ error: "No stores found" });
            return;
        }

        res.status(200).json(filteredStores);
    } catch (error) {
        console.error("Error in getMyStores controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getStoreById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "No id provided" });
            return;
        }

        const store = await Store.findById(id);
        if (store) {
            res.status(200).json(store);
        } else {
            res.status(400).json({ error: "No such store found" });
        }
    } catch (error) {
        console.error("Error in getStoreById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
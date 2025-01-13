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
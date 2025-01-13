import { Request, RequestHandler, Response } from "express";
import { ProcessOrderBody, SearchInput, WarehouseRequestBody } from "../types/types";
import Warehouse from "../models/warehouse.model";
import Store from "../models/store.model";
import { Types } from "mongoose";
import getCurrentMonth from "../utils/getCurrentMonth";
import getYearIndex from "../utils/getYearIndex";

export const createWarehouse: RequestHandler<{}, {}, WarehouseRequestBody> = async (req, res) => {
    try {
        const { code, contactNo, address } = req.body;

        if (code.length < 3) {
            res.status(400).json({ error: "Warehouse Name should be at least 3 characters long" });
            return;
        }
        if (contactNo.length !== 10) {
            res.status(400).json({ error: "Enter a valid Phone no." });
            return;
        }

        const warehouseAlreadyExists = await Warehouse.findOne({ code });
        if (warehouseAlreadyExists) {
            res.status(400).json({ error: "A Warehouse with this code already exists" });
            return;
        }

        const newWarehouse = new Warehouse({
            code,
            contactNo,
            address
        });

        if (newWarehouse) {
            await newWarehouse.save();
            res.status(201).json(newWarehouse);
        } else {
            res.status(400).json({ error: "Error in creating Warehouse. Enter valid data" });
        }
    } catch (error) {
        console.error("Error in createWarehouse controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listSimilarItems = async (req: Request, res: Response) => {
    try {
        const { item, warehouseId }: SearchInput = req.body;

        const warehouse = await Warehouse.findById(warehouseId);
        if (!warehouse) {
            res.status(400).json({ error: "Warehouse not found" });
            return;
        }

        const registeredStores = warehouse.registeredStores;
        const stores = await Store.find({ _id: { $in: registeredStores } });
        if (!stores || stores.length === 0) {
            res.status(400).json({ error: "No registered stores found for this warehouse" });
            return;
        }

        const similarItems: Array<{
            _id: Types.ObjectId;
            storeId: Types.ObjectId;
            storeName: string;
            item: string;
            quantity: number;
            mrp: number;
        }> = [];

        for (const store of stores) {
            const matchedItems = store.inventory.filter((inv: any) =>
                inv.item.toLowerCase().includes(item.toLowerCase())
            );

            matchedItems.forEach((matchedItem: any) => {
                similarItems.push({
                    _id: matchedItem._id,
                    storeId: store._id,
                    storeName: store.name,
                    item: matchedItem.item,
                    quantity: matchedItem.quantity,
                    mrp: matchedItem.mrp,
                });
            });
        }

        if (similarItems.length === 0) {
            res.status(400).json({ error: "No items matching the search query found in any store" });
            return;
        }
        res.status(200).json(similarItems);
    } catch (error) {
        console.error("Error in listSimilarItems controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const processOrder = async (req: Request, res: Response) => {
    try {
        const { storeId, itemId, quantity }: ProcessOrderBody = req.body;

        const store = await Store.findById(storeId);
        if (!store) {
            res.status(400).json({ error: "Store not found" });
            return;
        }
        const inventoryItem = store.inventory.find((inv: any) => inv._id.toString() === itemId);
        if (!inventoryItem) {
            res.status(400).json({ error: "Item not found in the store's inventory" });
            return;
        }

        if (inventoryItem.quantity < quantity) {
            res.status(400).json({ error: "Insufficient quantity in stock" });
            return;
        }
        inventoryItem.quantity -= quantity;

        if (inventoryItem.quantity === 0) {
            const itemIndex = store.inventory.findIndex((inv: any) => inv._id.toString() === inventoryItem._id.toString());
            if (itemIndex !== -1) {
                store.inventory.splice(itemIndex, 1); // Removing the item from inventory for quantity 0
            }
        }

        const currentMonth = getCurrentMonth();
        store.incomePerMonth[currentMonth] += inventoryItem.mrp * quantity;
        store.incomePerYear[getYearIndex(req.user!)] += inventoryItem.mrp * quantity;
        await store.save();

        const warehouse = await Warehouse.findById(store.warehouseId);
        if (!warehouse) {
            res.status(400).json({ error: "Warehouse not found" });
            return;
        }
        warehouse.income += inventoryItem.mrp * quantity;
        await warehouse.save();

        res.status(200).json({
            _id: inventoryItem._id,
            storeId: store._id,
            warehouseId: warehouse._id,
            warehouse: warehouse.code,
            store: store.name,
            item: inventoryItem.item,
            quantity,
            totalCost: inventoryItem.mrp * quantity,
        });
    } catch (error) {
        console.error("Error in Process Order controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

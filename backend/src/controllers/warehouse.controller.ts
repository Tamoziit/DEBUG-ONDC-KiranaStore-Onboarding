import { Request, RequestHandler, Response } from "express";
import { ProcessOrderBody, SearchInput, WarehouseRequestBody } from "../types/types";
import Warehouse from "../models/warehouse.model";
import Store from "../models/store.model";
import { Types } from "mongoose";
import getCurrentMonth from "../utils/getCurrentMonth";
import getYearIndex from "../utils/getYearIndex";
import User from "../models/user.model";

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
        const item = req.query.item as string;

        if (!item || typeof item !== "string") {
            res.status(400).json({ error: "Item name is required and must be a string" });
            return;
        }

        // Fetch all warehouses
        const warehouses = await Warehouse.find();
        if (!warehouses || warehouses.length === 0) {
            res.status(400).json({ error: "No warehouses found" });
            return;
        }

        const similarItems: Array<{
            _id: Types.ObjectId;
            storeId: Types.ObjectId;
            owner: Types.ObjectId;
            storeName: string;
            warehouseId: Types.ObjectId;
            warehouseCode: string;
            item: string;
            url: string
            quantity: number;
            mrp: number;
        }> = [];

        for (const warehouse of warehouses) {
            const registeredStores = warehouse.registeredStores;
            const stores = await Store.find({ _id: { $in: registeredStores } });

            if (stores && stores.length > 0) {
                for (const store of stores) {
                    const matchedItems = store.inventory.filter((inv: any) =>
                        inv.item.toLowerCase().includes(item.toLowerCase())
                    );

                    matchedItems.forEach((matchedItem: any) => {
                        similarItems.push({
                            _id: matchedItem._id,
                            storeId: store._id,
                            owner: store.owner,
                            storeName: store.name,
                            warehouseId: warehouse._id,
                            warehouseCode: warehouse.code,
                            item: matchedItem.item,
                            url: matchedItem.url,
                            quantity: matchedItem.quantity,
                            mrp: matchedItem.mrp,
                        });
                    });
                }
            }
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

        const seller = await User.findById(store.owner);
        if (seller) {
            const currentMonth = getCurrentMonth();
            store.incomePerMonth[currentMonth] += inventoryItem.mrp * quantity;
            store.incomePerYear[getYearIndex(seller)] += inventoryItem.mrp * quantity;
            await store.save();
        } else {
            res.status(400).json({ error: "Seller not found or inactive" });
            return;
        }

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
            url: inventoryItem.url,
            quantity,
            totalCost: inventoryItem.mrp * quantity,
        });
    } catch (error) {
        console.error("Error in Process Order controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getWarehouses = async (req: Request, res: Response) => {
    try {
        const warehouses = await Warehouse.find({});
        if (warehouses.length === 0) {
            res.status(400).json({ error: "No warehouses found" });
        }
        res.status(200).json(warehouses);
    } catch (error) {
        console.error("Error in getWarehouses controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getWarehouseById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "No id provided" });
            return;
        }

        const store = await Warehouse.findById(id);
        if (store) {
            res.status(200).json(store);
        } else {
            res.status(400).json({ error: "No such store found" });
        }
    } catch (error) {
        console.error("Error in getWarehouseById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getProductsFromLatestWarehouses = async (req: Request, res: Response) => {
    try {
        const limit = Math.min(parseInt(req.query.limit as string) || 3, 3);

        const warehouses = await Warehouse.find()
            .sort({ updatedAt: -1 })
            .limit(limit);

        if (!warehouses || warehouses.length === 0) {
            res.status(400).json({ error: "No warehouses found" });
            return;
        }

        const allProducts: Array<{
            _id: Types.ObjectId;
            storeId: Types.ObjectId;
            owner: Types.ObjectId;
            storeName: string;
            warehouseId: Types.ObjectId;
            warehouseCode: string;
            item: string;
            url: string
            quantity: number;
            mrp: number;
        }> = [];

        for (const warehouse of warehouses) {
            const registeredStores = warehouse.registeredStores;
            const stores = await Store.find({ _id: { $in: registeredStores } });

            if (stores && stores.length > 0) {
                for (const store of stores) {
                    store.inventory.forEach((product: any) => {
                        allProducts.push({
                            _id: product._id,
                            storeId: store._id,
                            owner: store.owner,
                            storeName: store.name,
                            warehouseId: warehouse._id,
                            warehouseCode: warehouse.code,
                            item: product.item,
                            url: product.url,
                            quantity: product.quantity,
                            mrp: product.mrp,
                        });
                    });
                }
            }
        }

        if (allProducts.length === 0) {
            res.status(400).json({ error: "No products found in the selected warehouses" });
            return;
        }

        res.status(200).json(allProducts);
    } catch (error) {
        console.error("Error in getProductsFromLatestWarehouses controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
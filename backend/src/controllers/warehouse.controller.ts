import { RequestHandler } from "express";
import { WarehouseRequestBody } from "../types/types";
import Warehouse from "../models/warehouse.model";

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
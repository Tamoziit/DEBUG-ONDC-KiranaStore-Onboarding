import mongoose from "mongoose";
import connectToExchangesDB from "../db/exchangesDB";

const ExchangesDB = connectToExchangesDB();

const WarehouseSchema = new mongoose.Schema({
    code: {
        type: String,
        min: 3,
        required: true
    },
    contactNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    registeredStores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            default: []
        }
    ],
    inventoryCost: {
        type: Number,
        required: true,
        default: 0
    },
    income: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true});

const Warehouse = ExchangesDB!.model("Warehouse", WarehouseSchema);
export default Warehouse;
import mongoose from "mongoose";
import connectToOnboardingDB from "../db/onboardingDB";

const OnboardingDB = connectToOnboardingDB();

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    gstNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },
    warehouseCode: {
        type: String,
        required: true
    },
    inventory: [
        {
            item: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            costPerItem: {
                type: Number,
                required: true
            },
            mrp: {
                type: Number,
                required: true
            }
        }
    ],
    incomePerMonth: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    incomePerYear: {
        type: Array,
        default: [0]
    }
}, { timestamps: true });

const Store = OnboardingDB!.model("Store", StoreSchema);
export default Store;
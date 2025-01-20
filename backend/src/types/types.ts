import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

declare module "express" {
    export interface Request {
        user?: {
            _id: Types.ObjectId,
            name: string,
            mobileNo: string,
            age: number,
            gender: string,
            aadharNo: string,
            aadharNoPreHash: string
            stores: Types.ObjectId[];
            createdAt: Date;
            updatedAt: Date;
        }
    }
}

export interface User {
    _id: Types.ObjectId;
    name: string;
    mobileNo: string;
    age: number;
    gender: string;
    aadharNo: string;
    aadharNoPreHash: string;
    stores: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface SignupRequestBody {
    name: string;
    mobileNo: string;
    password: string;
    age: number;
    gender: string;
    aadharNo: string;
}

export interface LoginRequestBody {
    mobileNo: string;
    password: string;
}

export interface WarehouseRequestBody {
    code: string;
    contactNo: string;
    address: string;
}

export interface StoreRequestBody {
    name: string,
    gstNo: string,
    address: string,
    contactNo: string,
    warehouseId: Types.ObjectId,
    inventory: [
        {
            item: string,
            url: string,
            quantity: number,
            costPerItem: number,
            mrp: number
        }
    ]
}

export interface SearchInput {
    item: string;
    warehouseId: Types.ObjectId;
}

export interface ProcessOrderBody {
    storeId: Types.ObjectId;
    itemId: Types.ObjectId;
    quantity: number
}

export interface StoreBody {
    _id: Types.ObjectId;
    name: string;
    owner: Types.ObjectId;
    gstNo: string;
    address: string;
    contactNo: string;
    warehouseId: Types.ObjectId;
    warehouseCode: string;
    inventory: InventoryItem[];
    incomePerMonth: number[];
    incomePerYear: number[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface InventoryItem {
    _id: Types.ObjectId;
    item: string;
    url: string;
    mrp: number;
    quantity: number;
}
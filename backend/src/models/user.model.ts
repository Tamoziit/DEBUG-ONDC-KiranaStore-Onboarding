import mongoose from "mongoose";
import connectToOnboardingDB from "../db/onboardingDB";

const OnboardingDB = connectToOnboardingDB();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    mobileNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["M", "F", "O"]
    },
    aadharNo: {
        type: String,
        required: true
    },
    aadharNoPreHash: {
        type: String,
        required: true
    },
    stores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            default: []
        }
    ]
}, { timestamps: true });

const User = OnboardingDB!.model("User", UserSchema);
export default User;
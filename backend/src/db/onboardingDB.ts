import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectToOnboardingDB = () => {
    try {
        const OnboardingDB = mongoose.createConnection(process.env.ONBOARDING_DB!);
        console.log("Connected to Onboarding DB");
        return OnboardingDB;
    } catch (error) {
        console.log("Error in connecting to Onboarding DB: ", error);
    }
}

export default connectToOnboardingDB;
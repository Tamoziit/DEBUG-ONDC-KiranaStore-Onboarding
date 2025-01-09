import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectToExchangesDB = () => {
    try {
        const ExchangesDB = mongoose.createConnection(process.env.EXCHANGES_DB!);
        console.log("Connected to Exchanges DB");
        return ExchangesDB;
    } catch (error) {
        console.log("Error in connecting to Exchanges DB: ", error);
    }
}

export default connectToExchangesDB;
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import connectToExchangesDB from "../db/exchangesDB";
import adminRoutes from "../routes/admin.routes";
import warehouseRoutes from "../routes/warehouse.routes";

const PORT2 = process.env.PORT2 || 8001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.get("/api/v1", (req: Request, res: Response) => {
    res.send("<h1>Server up & running</h1>");
});

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/warehouse", warehouseRoutes);

app.listen(PORT2, () => {
    console.log(`Exchange Server running on Port: ${PORT2}`);
    connectToExchangesDB();
});
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import connectToOnboardingDB from "../db/onboardingDB";
import adminRoutes from "../routes/admin.routes";
import authRoutes from "../routes/auth.routes";

const PORT1 = process.env.PORT1 || 8000;
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
app.use("/api/v1/auth", authRoutes);

app.listen(PORT1, () => {
    console.log(`Onboarding Server running on Port: ${PORT1}`);
    connectToOnboardingDB();
});
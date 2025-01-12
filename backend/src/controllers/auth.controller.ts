import crypto from "crypto";
import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie";
import { client } from "../redis/client";
import { LoginRequestBody, SignupRequestBody } from "../types/types";

export const signup: RequestHandler<{}, {}, SignupRequestBody> = async (req, res) => {
    try {
        const {
            name,
            mobileNo,
            password,
            age,
            gender,
            aadharNo

        } = req.body;

        // Validators
        if (password.length < 6) {
            res.status(400).json({ error: "Password should be at least 6 characters long" });
            return;
        }
        if (mobileNo.length !== 10) {
            res.status(400).json({ error: "Enter a valid Phone no." });
            return;
        }
        if (name.length < 2) {
            res.status(400).json({ error: "Name should be at least 2 characters long" });
            return;
        }

        // Pre-hashing Aadhar No. for querying
        const preHashedAadhar = crypto.createHash("sha256").update(aadharNo).digest("hex");

        // Checking if mobileNo. or Aadhar No. already exists
        const sameUser = await User.findOne({ $or: [{ mobileNo }, { aadharNoPreHash: preHashedAadhar }] });
        if (sameUser) {
            res.status(400).json({
                error: sameUser.mobileNo === mobileNo
                    ? "A user with this phone no. already exists. Use another phone no., or try logging into your account."
                    : "A user with this Aadhar No. already exists. Use another Aadhar No., or try logging into your account."
            });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        const aadharNoHash = await bcrypt.hash(aadharNo, salt);

        const newUser = new User({
            name,
            mobileNo,
            password: passwordHash,
            age,
            gender,
            aadharNo: aadharNoHash,
            aadharNoPreHash: preHashedAadhar // Storing pre-hashed value for efficient querying
        });

        if (newUser) {
            await newUser.save();

            const token = generateTokenAndSetCookie(newUser._id, res);
            const payload = {
                token,
                _id: newUser._id,
                name: newUser.name,
                mobileNo: newUser.mobileNo,
                password: newUser.password,
                age: newUser.age,
                gender: newUser.gender,
                aadharNo: newUser.aadharNo
            };

            await client.set(`ONDC-user:${newUser._id}`, JSON.stringify(payload));
            await client.expire(`ONDC-user:${newUser._id}`, 30 * 24 * 60 * 60);

            res.status(201)
                .header("Authorization", `Bearer ${token}`)
                .json({
                    _id: newUser._id,
                    name: newUser.name,
                    mobileNo: newUser.mobileNo,
                    age: newUser.age,
                    gender: newUser.gender,
                    token
                });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in Signup controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login: RequestHandler<{}, {}, LoginRequestBody> = async (req, res) => {
    try {
        const { mobileNo, password } = req.body;
        const user = await User.findOne({ mobileNo });
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const isPaswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPaswordCorrect) {
            res.status(400).json({ error: "Invalid Login Credentials" });
            return;
        }

        res.cookie("jwt", "", { maxAge: 0 });
        const token = generateTokenAndSetCookie(user._id, res);
        const payload = {
            token,
            _id: user._id,
            name: user.name,
            mobileNo: user.mobileNo,
            password: user.password,
            age: user.age,
            gender: user.gender,
            aadharNo: user.aadharNo
        }

        await client.set(`ONDC-user:${user._id}`, JSON.stringify(payload));
        await client.expire(`ONDC-user:${user._id}`, 30 * 24 * 60 * 60);

        res.status(200)
            .header("Authorization", `Bearer ${token}`)
            .json({
                _id: user._id,
                name: user.name,
                mobileNo: user.mobileNo,
                age: user.age,
                gender: user.gender,
                token
            });
    } catch (error) {
        console.log("Error in Logging in", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        
        res.cookie("jwt", "", { maxAge: 0 });
        await client.del(`ONDC-user:${userId}`);
        
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logging out", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
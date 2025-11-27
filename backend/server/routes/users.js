import { Router } from "express";
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { hash } from "crypto";

const userRouter = Router();
const mongoClient = new MongoClient(process.env.MONGO_URL)
await mongoClient.connect();
const db = mongoClient.db(process.env.MONGO_DB_NAME);
const users = db.collection("users");

userRouter.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existing = await users.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const insert = await users.insertOne({
            username, 
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

userRouter.post('/users/sign-in', async (req, res) => {
    try { 
        const { email, password } = req.body;

        const existing = await users.findOne({ email });
        
        if (!existing) { 
        return res.status(400).json({ message: "User not found" });
       }

       const passwordValid = await bcrypt.compare(password, existing.password);
       if (!passwordValid) { 
        return res.status(401).json({ message: "Invalid password" });
       }

       const token = jwt.sign(
        { id: existing._id, email: existing.email},
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
       );
       res.status(200).json({ message: "Login successful", token});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

export default userRouter;
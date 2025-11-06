import { Router } from "express";
import bcrypt from 'bcrypt';
import { User } from "../database/UserModel.tsx";

const userRouter = new Router();

userRouter.post('/users/sign-up', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = db.collection("users");

        const { username, email, password } = req.body;

        const existing = await users.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await users.insertOne({
            username, 
            email,
            password: hash
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

export default userRouter;
import { Router } from "express";
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const mongoClient = new MongoClient(import.meta.env.REACT_APP_MONGO_URL)

userRouter.post('/users/sign-up', async (req, res) => {
    try {
        await mongoClient.connect();
        const users = db.collection("users");

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

        console.log("Inserted user:", insert._id);
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

userRouter.post('/users/sign-in', async (req, res) => {
    try { 
        await mongoClient.connect();
        const users = db.collection("users");

        const { email, password } = req.body;

        const existing = await users.findOne({ email });
        const passwordValid = bcrypt.compare(password, email.hashedPassword);
        if (!existing) { 
            console.log(`{email} not found in database.`);
            alert("Email not found in database.");
        } 
        if (!passwordValid) { 
            console.log("Wrong password")
            alert("Incorrect password")
        }
        
       
    } catch (err) {
        
    }
})

export default userRouter;
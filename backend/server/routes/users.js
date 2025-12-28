import { Router } from 'express';
import bcrypt from 'bcrypt';
import { connectDB } from '../db.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';
import { authMiddleware } from '../authMiddleware.js';

const userRouter = Router();

// GET all users
userRouter.get('/users', async (req, res) => {
    try {
        const db = await connectDB();
        const users = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET user by ID
userRouter.get('/users/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) }, { projection: { password: 0 } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SIGN-UP
userRouter.post('/sign-up', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing field.' });
    }

    try {
        const db = await connectDB();
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'Email already registered.' });
            window.alert("Email already registered.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.collection('users').insertOne({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SIGN-IN
userRouter.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing field.' });
    }

    try {
        const db = await connectDB();
        const user = await db.collection('users').findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // ✅ Store JWT in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,      // set false if no HTTPS (local dev)
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        res.json({
            message: 'Signed in successfully',
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET USER PROFILE
userRouter.get('/me', authMiddleware, async (req, res) => {
    try { 
        const db = await connectDB();
        const user = await db
        .collection('users')
        .findOne(
            { _id: new ObjectId(req.userId) },
            { projection: { password: 0 } }
        );
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

// LOG OUT
userRouter.post('/logout', async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    res.json({ message: "Logged out successfully"});
})

// UPDATE user
userRouter.put('/users/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE user
userRouter.delete('/users/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default userRouter;

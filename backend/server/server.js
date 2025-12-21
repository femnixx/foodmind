import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import userRouter from './routes/users.js';
import { connectDB } from './db.js';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth/', userRouter);

const db = await connectDB();

app.get('/', (req, res) => {
    console.log('Server running');
    res.send("Welcome to the backend");
});


app.listen(port, () => {
    console.log('Express server running normally at http://localhost:5000.');
});





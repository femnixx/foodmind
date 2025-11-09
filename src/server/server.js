import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from '../server/routes/users.js';
import { MongoClient } from "mongodb";
import aicall from './routes/ai-call.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("FoodMind API Running");
});

app.use('/api/ai/', aicall);

const client = MongoClient.connect(process.env.MONGO_URL);

async function connectDB() {
    try { 
        await client.connect();
        console.log("MongoDB Connected");
        
        app.locals.db = client.db(process.env.MONGO_DB_NAME);
    } catch (err) {
        res.status(404).json({ message:"DB connection error:", err});
    }
}
connectDB();

app.use('/api/users', userRouter);
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

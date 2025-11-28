import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URL);
let db;

async function connectDB() {
    try { 
         await client.connect();
         db = client.db(process.env_MONGO_DB);
         console.log('Connected to MongoDB');
    } catch (err) {
        console.error("Mongo error: ", err);
        process.exit(1);
    }
}

connectDB();

app.get('/', (req, res) => {
    console.log('Server running');
    res.send("Welcome to the backend");
});


app.listen(port, () => {
    console.log('Express server running normally at http://localhost:5000.');
});





const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const userRouter = require('./routes/users');   // no .js needed in CommonJS
const aicall = require('./routes/ai-call');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send("FoodMind API Running");
});

// AI routes
app.use('/api/ai', aicall);

// MongoDB connection
let client;

async function connectDB() {
    try { 
        client = new MongoClient(process.env.MONGO_URL);
        await client.connect();
        console.log("MongoDB Connected");

        app.locals.db = client.db(process.env.MONGO_DB_NAME);
    } catch (err) {
        console.error("DB connection error:", err);
        process.exit(1);
    }
}

connectDB();

// User routes
app.use('/api/users', userRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

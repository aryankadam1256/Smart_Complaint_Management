require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file.");
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.get('/', (req, res) => {
    res.send("Complaint Management Portal Backend is Running");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

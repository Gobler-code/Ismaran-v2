require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Recallify V2 API is running' })
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB connection failed', error);
        process.exit(1);
    });
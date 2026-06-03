require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const documentRoutes = require('./src/routes/documentRoutes');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/documents' ,documentRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Recallify V2 API is running' })
})
app.post('/test', (req, res) => {
    res.json({ success: true, message: 'test works' });
});

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
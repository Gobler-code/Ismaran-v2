require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const documentRoutes = require('./src/routes/documentRoutes');
const aiRoutes = require('./src/routes/aiRoutes')
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.use('/api/auth', authRoutes);
app.use('/api/documents' ,documentRoutes);
app.use('/api/ai',aiRoutes);


app.get('/', (req, res) => {
  res.json({ success: true, message: 'Ismaran V2 API is running' })
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
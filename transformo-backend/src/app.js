const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors=require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const fileRoutes = require('./routes/fileRoutes');
const userRoutes=require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

app.use('/api/files', fileRoutes);
app.use('/api/user',userRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error.message);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
